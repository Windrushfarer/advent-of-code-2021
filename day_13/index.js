import path from 'path'
import fs from 'fs'

function parseInput() {
  const [first, second] = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n\n')
  const dots = first.split('\n').map(line => line.split(',').map(Number))
  const instructions = second.split('\n')
    .map(line => line.split(' '))
    .map(parts => parts[parts.length - 1])
    .map(line => line.split('='))
    .map(([dir, value]) => [dir, Number(value)])

  return [dots, instructions]
}

function creaseAt(current, num) {
  if (current < num) {
    return current
  }

  return (num * 2) - current
}

function foldPoints(points, instruction) {
  const [dir, value] = instruction

  if (dir === 'x') {
    return new Set(
      points.map(([x, y]) => `${creaseAt(x, value)},${y}`)
    )
  }

  return new Set(
    points.map(([x, y]) => `${x},${creaseAt(y, value)}`)
  )
}

function mapToPoints(set) {
  return Array.from(set)
    .map(coords => coords.split(','))
    .map(([x, y]) => [Number(x), Number(y)])
}

/**
 * @param {number[][]} dots
 * @returns {number[][]}
 */
function buildBoard(dots) {
  const width = Math.max(...dots.map(([x]) => x))
  const height = Math.max(...dots.map(([_, y]) => y))
  const board = new Array(height + 1).fill(0).map(() => new Array(width + 1).fill('O'))

  dots.forEach(([x, y]) => {
    board[y][x] = '#'
  })

  return board
}


function partOne() {
  let [dots, instructions] = parseInput()

  return foldPoints(dots, instructions[0]).size
}

function partTwo() {
  let [dots, instructions] = parseInput()


  instructions.forEach(instruction => {
    dots = mapToPoints(foldPoints(dots, instruction))
  })

  return buildBoard(dots)
}


// partOne() // ?
partTwo() // ?
