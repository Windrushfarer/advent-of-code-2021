import path from 'path'
import fs from 'fs'

function mutateMap(map, key, value) {
  if (!map.has(key)) {
    map.set(key, 0)
  }

  map.set(key, map.get(key) + value)
}

function getPairs(map, rules) {
  const newPairs = new Map()

  for (const pair of map.keys()) {
    const insertion = rules[pair]

    if (insertion) {
      const [first, second] = pair.split('')
      const firstPair = `${first}${insertion}`
      const secondPair = `${insertion}${second}`

      mutateMap(newPairs, firstPair, map.get(pair))
      mutateMap(newPairs, secondPair, map.get(pair))
    }
  }

  return newPairs
}

function parseInput() {
  const lines = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n')
  let template = lines[0]
  const rules = lines.slice(2).reduce((acc, line) => {
    const [rule, output] = line.split(' -> ')

    acc[rule] = output

    return acc
  }, {})

  return {
    template,
    rules
  }
}

function solve(steps) {
  const { template, rules } = parseInput()
  const lastChar = template.charAt(template.length - 1)
  let pairs = new Map()

  for (let i = 1; i < template.length; i++) {
    const pair = `${template.charAt(i - 1)}${template.charAt(i)}`

    mutateMap(pairs, pair, 1)
  }

  while (steps--) {
    pairs = getPairs(pairs, rules)
  }

  const frequencies = new Map()

  mutateMap(frequencies, lastChar, 1)

  for (const pair of pairs.keys()) {
    const value = pairs.get(pair)

    mutateMap(frequencies, pair[0], value)
  }

  const max = Math.max(...Array.from(frequencies.values()))
  const min = Math.min(...Array.from(frequencies.values()))

  return max - min
}

function partOne() {
  return solve(10)
}

function partTwo() {
  return solve(40)
}

partOne() // ?
partTwo() // ?
