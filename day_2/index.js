import { readInputFile } from "../utils/readInput";
import path from 'path'

/**
 * @param {string} input
 * @returns {number}
 */
function main(input) {
  const data = input
    .split('\n')
    .map(line => {
      const [direction, value] = line.split(' ')

      return [direction, parseInt(value)]
    })

  let horizontal = 0
  let aim = 0
  let depth = 0

  data.forEach(([direction, value]) => {
    if (direction === 'down') {
      aim += value
    }

    if (direction === 'up') {
      aim -= value
    }

    if (direction === 'forward') {
      horizontal += value
      depth += aim * value
    }
  })

  return horizontal * depth
}

main(
  readInputFile(path.join(__dirname, 'input.txt'))
) // ?