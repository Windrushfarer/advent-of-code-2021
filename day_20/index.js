function parseInput() {
  const [algo, _, ...imageData] = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n')

  return [
    algo.split('').map(char => char === '#' ? 1 : 0),
    imageData.map(line => line.split('').map(char => char === '#' ? 1 : 0))
  ]
}

function within(y, x, height, width) {
  return 0 <= x && x < width && 0 <= y && y < height
}

function getNeighbours(row, cell, grid, defaultValue) {
  return [
    [row - 1, cell - 1],
    [row - 1, cell],
    [row - 1, cell + 1],
    [row, cell - 1],
    [row, cell],
    [row, cell + 1],
    [row + 1, cell - 1],
    [row + 1, cell],
    [row + 1, cell + 1],
  ]
    .map(
      ([row, cell]) => within(row, cell, grid.length, grid[0].length) ?
        grid[row][cell] :
        defaultValue
    )
}

function resizeImage(image, defaultValue) {
  const grid = image.slice().map(row => [defaultValue, ...row, defaultValue])

  grid.unshift(new Array(grid[0].length).fill(defaultValue))
  grid.push(new Array(grid[0].length).fill(defaultValue))

  return grid
}

function enhance(pattern, image, defaultValue) {
  const resized = resizeImage(image, defaultValue)
  const result = new Array(resized.length)
    .fill(0)
    .map(() => new Array(resized[0].length).fill(defaultValue))

  for (let row = 0; row < resized.length; row++) {
    for (let cell = 0; cell < resized[row].length; cell++) {
      const neighbours = getNeighbours(row, cell, resized, defaultValue)
      const binary = neighbours.join('')

      result[row][cell] = pattern[parseInt(binary, 2)]
    }
  }

  return result
}

function solve(rounds) {
  const [pattern, image] = parseInput()
  let result = image
  let defaultValue = pattern[0]

  while (rounds--) {
    defaultValue = defaultValue === 0 ? 1 : 0
    result = enhance(pattern, result, defaultValue)
  }

  return result.reduce((sum, row) => sum + row.filter(v => v === 1).length, 0)
}

function partOne() {
  return solve(2)
}

function partTwo() {
  return solve(50)
}

partOne()
partTwo()