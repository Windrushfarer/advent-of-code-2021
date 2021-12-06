import path from 'path'
import { readInputFile } from '../utils/readInput';

function partOne() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))

  const coords = data.split('\n')
    .map(line => line.split('->'))
    .map(entries => entries.map(s => s.trim()))
    .map(coorStrs => coorStrs.map(str => str.split(',').map(Number)))
    .filter(([start, end]) => {
      const [x1, y1] = start
      const [x2, y2] = end

      return x1 === x2 || y1 === y2
    })

  const field = new Array(1000)
    .fill(0)
    .map(() => new Array(1000).fill(0))

  coords.forEach(([start, end]) => {
    const [x1, y1] = start
    const [x2, y2] = end
    const xStart = Math.min(x1, x2)
    const xEnd = Math.max(x1, x2)
    const yStart = Math.min(y1, y2)
    const yEnd = Math.max(y1, y2)

    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        field[y][x] += 1
      }
    }
  })

  const points = field.reduce((sum, row) => {
    const overlaps = row.filter(val => val >= 2)

    return sum + overlaps.length
  }, 0)

  return points
}

function isDiagonale(start, end) {
  const [x1, y1] = start
  const [x2, y2] = end
  const xStart = Math.min(x1, x2)
  const xEnd = Math.max(x1, x2)
  const yStart = Math.min(y1, y2)
  const yEnd = Math.max(y1, y2)

  return (xEnd - xStart) === (yEnd - yStart)
}

function parTwo(size) {
  const data = readInputFile(path.join(__dirname, 'input.txt'))

  const coords = data.split('\n')
    .map(line => line.split('->'))
    .map(entries => entries.map(s => s.trim()))
    .map(coorStrs => coorStrs.map(str => str.split(',').map(Number)))
    .filter(([start, end]) => {
      const [x1, y1] = start
      const [x2, y2] = end

      return x1 === x2 || y1 === y2 || isDiagonale(start, end)
    })

  const field = new Array(size)
    .fill(0)
    .map(() => new Array(size).fill(0))

  coords.forEach(([start, end]) => {
    const [x1, y1] = start
    const [x2, y2] = end
    const xStart = Math.min(x1, x2)
    const xEnd = Math.max(x1, x2)
    const yStart = Math.min(y1, y2)
    const yEnd = Math.max(y1, y2)

    if (isDiagonale(start, end)) {
      if ((x2 > x1 && y2 > y1) || (x1 > x2 && y1 > y2)) {
        let x = xStart
        let y = yStart

        while (x <= xEnd && y <= yEnd) {
          field[y][x] += 1
          x++
          y++
        }
      } else {
        let x = xStart
        let y = yEnd

        while (x <= xEnd && y >= yStart) {
          field[y][x] += 1
          x++
          y--
        }
      }
    } else {
      for (let x = xStart; x <= xEnd; x++) {
        for (let y = yStart; y <= yEnd; y++) {
          field[y][x] += 1
        }
      }
    }
  })

  const points = field.reduce((sum, row) => {
    const overlaps = row.filter(val => val >= 2)

    return sum + overlaps.length
  }, 0)

  return points
}

parTwo(1000) // ?