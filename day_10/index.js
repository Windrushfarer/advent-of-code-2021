import path from 'path'
import { readInputFile } from '../utils/readInput';

const BRACKETS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}
const OPEN_BRACKETS = Object.keys(BRACKETS)

const WRONG_BRACKET_POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

function getWrongBracket(input) {
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

  return ''
}


function partOne() {
  const lines = readInputFile(path.join(__dirname, 'input.txt')).split('\n')
  const wrongBrackets = []

  lines.forEach(line => {
    const wrongBracket = getWrongBracket(line)

    if (wrongBracket) {
      wrongBrackets.push(wrongBracket)
    }
  })

  return wrongBrackets.reduce((acc, curr) => acc + WRONG_BRACKET_POINTS[curr], 0)
}

/**
 * @param {string} input
 * @returns {string[]}
 */
function getIncompleteBrackets(input) {
  const stack = []

  for (const char of input) {
    if (OPEN_BRACKETS.includes(char)) {
      stack.push(char)
    } else if (BRACKETS[stack[stack.length - 1]] === char) {
      stack.pop()
    }
  }

  return stack
}

const INCOMPLETE_BRACKET_POINTS = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

function partTwo() {
  const lines = readInputFile(path.join(__dirname, 'input.txt'))
    .split('\n')
    .filter(line => !getWrongBracket(line))

  const incompleteBrackets = []

  lines.forEach(line => {
    const brackets = getIncompleteBrackets(line)

    if (brackets.length > 0) {
      incompleteBrackets.push(brackets)
    }
  })

  return incompleteBrackets
    .map(brackets => brackets.map(bracket => BRACKETS[bracket]).reverse())
    .map(brackets => brackets.reduce((acc, curr) => {
      return (acc * 5) + INCOMPLETE_BRACKET_POINTS[curr]
    }, 0))
    .sort((a, b) => a - b)
    .at(Math.floor(incompleteBrackets.length / 2))
}

partOne()
partTwo()