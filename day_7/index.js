import path from 'path'
import { readInputFile } from '../utils/readInput';

function partOne() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const positions = data.split(',').map(Number)
  const mid = Math.ceil(positions.length / 2)
  const less = positions.filter(x => x < positions[mid]).sort((a, b) => a - b)
  const more = positions.filter(x => x > positions[mid])
  const mids = positions.filter(x => x === positions[mid])
  const nums = [...less, ...mids, ...more]
  const median = nums[mid]

  return nums
    .map(pos => Math.abs(pos - median))
    .reduce((sum, pos) => sum + pos, 0)
}

function partTwo() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const positions = data.split(',').map(Number)
  const max = Math.max(...positions)
  const min = Math.min(...positions)

  let minFuel = Number.MAX_SAFE_INTEGER

  for (let i = min; i <= max; i++) {
    let fuelSpend = 0

    positions.forEach(end => {
      if (i !== end) {
        const distance = Math.abs(end - i)
        // Gauss formula
        fuelSpend += distance * (distance + 1) / 2
      }
    })

    minFuel = Math.min(minFuel, fuelSpend)
  }

  return minFuel
}


partOne()
partTwo()