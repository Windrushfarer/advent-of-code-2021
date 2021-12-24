import fs from 'fs'

function parseInput() {
  return fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .trim()
    .split('\n')
    .map(line => line.split(' | ').map(x => x.split(' ')))
}

function partOne() {
  const data = parseInput()
  const simpleLengths = [2, 3, 4, 7]
  let instances = 0

  data.forEach(([_, outputs]) => {
    instances += outputs.filter(x => simpleLengths.includes(x.length)).length
  })

  return instances
}

function overlaps(first, second) {
  return first.split('').every(char => second.includes(char))
}

function createDigitsMap(pattern) {
  const one = pattern.find(p => p.length === 2)
  const seven = pattern.find(p => p.length === 3)
  const four = pattern.find(p => p.length === 4)
  const eight = pattern.find(p => p.length === 7)
  const three = pattern.find(p => p.length === 5 && overlaps(one, p))
  const nine = pattern.find(p => p.length === 6 && overlaps(three, p))
  const zero = pattern.find(p => p.length === 6 && p !== nine && overlaps(one, p) && overlaps(seven, p))
  const six = pattern.find(p => p.length === 6 && p !== nine & p !== zero)
  const five = pattern.find(p => p.length === 5 && overlaps(p, six))
  const two = pattern.find(p => p.length === 5 && p !== five && p !== three)

  return new Map([
    [one, 1],
    [two, 2],
    [three, 3],
    [four, 4],
    [five, 5],
    [six, 6],
    [seven, 7],
    [eight, 8],
    [nine, 9],
    [zero, 0],
  ].map(([key, value]) => [
    key.split('').sort().join(''),
    value
  ]))
}

function partTwo() {
  const data = parseInput()

  return data
    .map(([pattern, output]) => {
      const digits = createDigitsMap(pattern)
      const value = output.map(out => {
        const key = out.split('').sort().join('')
        return digits.get(key)
      }).join('')

      return parseInt(value, 10)
    })
    .reduce((sum, acc) => sum + acc, 0)
}

partOne()
partTwo()