import path from 'path'
import { readInputFile } from '../utils/readInput';

function partOne() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const positions = data.split(',').map(Number)
  const max = Math.max(...positions)
  const min = Math.min(...positions)

  const fuelSpend = {}

  for (let i = min; i <= max; i++) {
    fuelSpend[i] = 0

    positions.forEach((end, j) => {
      if (i !== end) {
        fuelSpend[i] += Math.abs(end - i)
      }
    })
  }

  return Math.min(...Object.values(fuelSpend))
}

function rangeSum(end) {
  let sum = 0;

  for (let i = 1; i <= end; i++) {
    sum += i;
  }

  return sum;
}
function partTwo() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const positions = data.split(',').map(Number)
  const max = Math.max(...positions)
  const min = Math.min(...positions)

  let minFuel = Number.MAX_SAFE_INTEGER

  for (let i = min; i <= max; i++) {
    let fuelSpend = 0

    positions.forEach((end, j) => {
      if (i !== end) {
        fuelSpend += rangeSum(Math.abs(end - i))
      }
    })

    minFuel = Math.min(minFuel, fuelSpend)
  }

  return minFuel
}


// partOne() // ?
partTwo() // ?