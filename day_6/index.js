import path from 'path'
import { readInputFile } from '../utils/readInput';

function calculatePopulation(initial, days) {
  const fishes = initial
    .reduce((map, age) => {
      map[age] += 1

      return map
    }, new Array(9).fill(0))

  for (let day = 1; day < days; day++) {
    fishes[(day + 7) % 9] += fishes[day % 9]
  }

  return fishes.reduce((sum, count) => sum + count, 0)
}

function partOne() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const fishes = data.split(',').map(Number)

  return calculatePopulation(fishes, 80)
}

function partTwo() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const fishes = data.split(',').map(Number)

  return calculatePopulation(fishes, 256)
}

partOne() // ?
partTwo() // ?