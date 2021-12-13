import path from 'path'
import { readInputFile } from '../utils/readInput';

const BRACKETS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}
const OPEN_BRACKETS = Object.keys(BRACKETS)

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

function checkBrackets(input) {
  const stack = []

  for (const char of input) {
    if (OPEN_BRACKETS.includes(char)) {
      stack.push(char)
    } else if (BRACKETS[stack[stack.length - 1]] === char) {
      stack.pop()
    } else {
      return char
    }
  }

  return false
}

function partOne() {
  const lines = readInputFile(path.join(__dirname, 'test.txt')).split('\n')
  const wrongBrackets = []

  lines.forEach(line => {
    const wrongBracket = checkBrackets(line)

    if (wrongBracket) {
      wrongBrackets.push(wrongBracket)
    }
  })

  return wrongBrackets.reduce((acc, curr) => acc + POINTS[curr], 0)
}

function partTwo() {

}

partOne() // ?
// partTwo() // ?