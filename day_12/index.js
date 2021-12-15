import path from 'path'
import fs from 'fs'

function parseInput() {
  const graph = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .split('\n')
    .map(line => line.split('-'))
    .reduce((paths, [start, end]) => {
      if (!paths[start]) {
        paths[start] = []
      }

      if (!paths[end]) {
        paths[end] = []
      }

      paths[start].push(end)

      if (start !== 'start') {
        paths[end].push(start)
      }

      return paths
    }, {})

  graph['end'] = []

  return graph
}

function partOne() {
  const graph = parseInput()
  const paths = []

  function findPaths(node, path) {
    if (node === 'end') {
      paths.push(path)
      return
    }

    graph[node]
      .filter(next => {
        const upper = next.toUpperCase()

        return upper === next || !path.includes(next)
      })
      .forEach(next => {
        findPaths(next, [...path, next])
      })
  }

  findPaths('start', ['start'])

  return paths.length
}

partOne() // ?
