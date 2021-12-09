import path from 'path'
import { readInputFile } from '../utils/readInput';

function within(y, x, height, width) {
  return 0 <= x && x < width && 0 <= y && y < height
}

function getLowPoints(grid) {
  const visited = new Set()
  const low_points = []
  const height = grid.length
  const width = grid[0].length
  const nodes = [[0, 0]]

  function traverse(row, col) {
    const coords = `${row},${col}`

    if (visited.has(coords)) {
      return
    }

    visited.add(coords)

    const neighbours = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]
      .filter(coords => within(...coords, height, width))

    const adjacents = neighbours.map(([x, y]) => grid[x][y])
    const value = grid[row][col]

    if (adjacents.every(n => n > value)) {
      low_points.push([row, col])
    }

    neighbours.forEach(([x, y]) => nodes.push([x, y]))
  }

  while (nodes.length !== 0) {
    const [row, col] = nodes.pop()

    traverse(row, col)
  }

  return low_points
}

function partOne() {
  const grid = readInputFile(path.join(__dirname, 'input.txt'))
    .split('\n')
    .map(line => line.split('').map(Number))

  const low_points = getLowPoints(grid)

  return low_points
    .map(([x, y]) => grid[x][y] + 1)
    .reduce((a, b) => a + b, 0)
}

function partTwo() {
  const grid = readInputFile(path.join(__dirname, 'input.txt'))
    .split('\n')
    .map(line => line.split('').map(Number))

  const visited = new Set()
  const height = grid.length
  const width = grid[0].length
  const low_points = getLowPoints(grid)

  function burnBasin(row, col) {
    const coords = `${row},${col}`

    if (visited.has(coords)) {
      return 0
    }

    visited.add(coords)
    const point = grid[row][col]
    const neighbours = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]
      .filter(
        ([r, c]) =>
          within(r, c, height, width) && grid[r][c] < 9
      )

    let adjacentCount = 0

    neighbours.forEach(([x, y]) => {
      adjacentCount += burnBasin(x, y)
    })

    return adjacentCount + 1
  }

  let basin_sizes = []

  low_points.forEach(([x, y]) => {
    basin_sizes.push(burnBasin(x, y))
  })

  return basin_sizes
    .sort((a, b) => b - a)
    .slice(0, 3) // ?
    .reduce((a, b) => a * b, 1)
}

// partOne() // ?
partTwo() // ?