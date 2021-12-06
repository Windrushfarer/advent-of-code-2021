import { readInputFile } from "../utils/readInput";
import path from 'path'

/**
 * @param {string} input
 * @returns {string[]}
 */
function getBitsInfo(input) {
  const data = input
    .split('\n')
    .map(value => {

      return value.split('').map(x => Number(x))
    })

  let gamma = ''
  let epsilon = ''

  for (let col = 0; col < data[0].length; col++) {
    let ones = 0

    for (let row = 0; row < data.length; row++) {
      ones += data[row][col]
    }

    const most = Math.round(ones / data.length)
    gamma += `${most}`
    epsilon += `${Number(!most)}`
  }

  return [gamma, epsilon]
}

/**
 * @param {string} input
 * @returns {number}
 */
function part1(input) {
  const [gamma, epsilon] = getBitsInfo(input)

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

/**
 * @param {string} input
 * @returns {number}
 */
function part2(input) {
  const data = input.split('\n')
  const width = data[0].length
  const nums = data.map(value => parseInt(value, 2))

  const oxygenRating = new Array(width)
    .fill(0)
    .map((_, index) => index)
    .reverse()
    .reduce((acc, i) => {
      const mostBit = acc.filter(n => (n & 1 << i) > 0).length >= Math.floor((acc.length + 1) / 2)

      if (acc.length === 1) {
        return acc
      }

      return acc.filter(n => ((n & 1 << i) > 0) === mostBit)
    }, nums.slice())

  const coRating = new Array(width)
    .fill(0)
    .map((_, index) => index)
    .reverse()
    .reduce((acc, i) => {
      const mostBit = acc.filter(n => (n & 1 << i) > 0).length >= Math.floor((acc.length + 1) / 2)

      if (acc.length === 1) {
        return acc
      }

      return acc.filter(n => (n & 1 << i) > 0 !== mostBit)
    }, nums.slice())

  return oxygenRating[0] * coRating[0]
}


part2(
  readInputFile(path.join(__dirname, 'input.txt'))
) // ?
