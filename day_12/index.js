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

function isAllowedVisitOnce(node, currentPath) {
  const isBigCave = node === node.toUpperCase()

  return isBigCave || !currentPath.includes(node)
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
      .filter(next => isAllowedVisitOnce(next, path))
      .forEach(next => {
        findPaths(next, [...path, next])
      })
  }

  findPaths('start', ['start'])

  return paths.length
}

function isAllowedVisitTwice(next, currentPath) {
  if (next === next.toUpperCase()) {
    return true
  }

  if (!currentPath.includes(next)) {
    return true
  }

  if (next === 'start') {
    return false
  }

  const smalls = currentPath.filter(node => node === node.toLowerCase())
  const allowed = smalls.every(node => {
    return smalls.filter(x => node === x).length !== 2
  })

  return allowed
}

function partTwo() {
  const graph = parseInput()
  const paths = []

  function findPaths(node, path) {
    if (node === 'end') {
      paths.push(path)
      return
    }

    graph[node]
      .filter(next => isAllowedVisitTwice(next, path))
      .forEach(next => {
        findPaths(next, [...path, next])
      })
  }

  findPaths('start', ['start'])

  return paths.length
}

partOne()
partTwo()
