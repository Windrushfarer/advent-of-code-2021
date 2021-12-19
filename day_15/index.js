import path from 'path'
import fs from 'fs'

function parseInput() {
  const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  const grid = data.split('\n').map(line => line.split('').map(Number))

  return grid
}

function coordinatesToIndex({ x, y }, map) {
  return x + y * map.length;
}

function indexToCoordinates(index, map) {
  const x = index % map.length;
  const y = (index - x) / map.length;
  return {
    x,
    y,
  };
}

function getNeighbors(index, map) {
  const { x, y } = indexToCoordinates(index, map);
  const list = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ].filter(({ x, y }) => x >= 0 && y >= 0 && x < map.length && y < map.length);
  return list;
}

function solve(map) {
  const finish = { x: map.length - 1, y: map.length - 1 };
  const finishIndex = coordinatesToIndex(finish, map);

  const dist = new Array(map.length * map.length).fill(Infinity);
  const queue = new Set(
    new Array(map.length * map.length)
      .fill(0)
      .map((_, index) => index)
  );

  dist[0] = 0;

  while (queue.size > 0) {
    let min = Infinity;
    let minIndex = 0;

    for (const value of queue) {
      if (dist[value] < min) {
        min = dist[value];
        minIndex = value;
      }
    }

    queue.delete(minIndex);

    if (minIndex === finishIndex) break;

    getNeighbors(minIndex, map).forEach(neighbor => {
      const neighborIndex = coordinatesToIndex(neighbor, map);
      const alt = dist[minIndex] + map[neighbor.y][neighbor.x];

      if (alt < dist[neighborIndex]) {
        dist[neighborIndex] = alt;
      }
    })
  }

  return dist[coordinatesToIndex(finish, map)]
}

function partOne() {
  const grid = parseInput()

  return solve(grid)
}

function partTwo() {
  const original = parseInput()
  const grid = Array(5 * original.length)
    .fill(0)
    .map((_, y) =>
      Array(5 * original.length)
        .fill(0)
        .map((_, x) => {
          const originalX = x % original.length;
          const originalY = y % original.length;
          const offset = Math.floor(x / original.length) + Math.floor(y / original.length);
          const value = original[originalY][originalX] + offset;
          return value > 9 ? value - 9 : value;
        })
    );


  return solve(grid)
}


partOne()
partTwo()
