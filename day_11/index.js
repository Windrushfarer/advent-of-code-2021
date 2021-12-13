import path from 'path'
import { readInputFile } from '../utils/readInput';

function within(y, x, height, width) {
  return 0 <= x && x < width && 0 <= y && y < height
}

function getNeighbours(row, cell) {
  return [
    [row - 1, cell],
    [row + 1, cell],
    [row, cell - 1],
    [row, cell + 1],
    [row - 1, cell - 1],
    [row + 1, cell + 1],
    [row - 1, cell + 1],
    [row + 1, cell - 1],
  ]
}

function partOne(steps) {
  const grid = readInputFile(path.join(__dirname, 'input.txt'))
    .split('\n')
    .map(line => line.split('').map(Number))
  const height = grid.length
  const width = grid[0].length
  let flashes = 0

  function flash(y, x) {
    const neighbours = getNeighbours(y, x)
      .filter(([row, cell]) => within(row, cell, height, width) && grid[row][cell] !== 0)

    neighbours.forEach(([row, cell]) => {
      grid[row][cell] = grid[row][cell] + 1
    })

    neighbours.forEach(([row, cell]) => {
      if (grid[row][cell] > 9) {
        grid[row][cell] = 0
        flashes++
        flash(row, cell)
      }
    })
  }

  for (let step = 0; step < steps; step++) {
    grid.forEach(row => {
      row.forEach((cell, index) => {
        row[index] = cell + 1;
      })
    })

    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (row[x] > 9) {
          row[x] = 0
          flashes++
          flash(y, x)
        }
      })
    })
  }

  return flashes
}

function partTwo() {
  const grid = readInputFile(path.join(__dirname, 'input.txt'))
    .split('\n')
    .map(line => line.split('').map(Number))
  const height = grid.length
  const width = grid[0].length

  function flash(y, x) {
    const neighbours = getNeighbours(y, x)
      .filter(([row, cell]) => within(row, cell, height, width) && grid[row][cell] !== 0)

    neighbours.forEach(([row, cell]) => {
      grid[row][cell] = grid[row][cell] + 1
    })

    neighbours.forEach(([row, cell]) => {
      if (grid[row][cell] > 9) {
        grid[row][cell] = 0
        flash(row, cell)
      }
    })
  }

  function isSimultanious() {
    return grid.every(row => row.every(cell => cell === 0))
  }

  let step = 0;

  while (true) {
    step++
    grid.forEach(row => {
      row.forEach((cell, index) => {
        row[index] = cell + 1;
      })
    })

    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (row[x] > 9) {
          row[x] = 0
          flash(y, x)
        }
      })
    })

    if (isSimultanious()) {
      break;
    }
  }

  return step
}

partOne()
partTwo()