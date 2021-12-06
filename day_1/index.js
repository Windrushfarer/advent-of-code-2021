import { getInputData } from "../utils/readInput";
import path from 'path'

function getIncreases(data) {
  const targetSum = new Array(data.length).fill(0)

  targetSum[0] = data[0]

  for (let i = 1; i < data.length; i++) {
    targetSum[i] = targetSum[i - 1] + data[i]
  }
  targetSum // ?
  let count = 0
  let prev = targetSum[2]
  for (let i = 3; i < data.length; i++) {
    let curr = targetSum[i] - targetSum[i - 3]

    if (curr > prev) {
      count++
    }

    prev = curr
  }

  return count
}

getIncreases(getInputData(path.join(__dirname, 'test.txt'))) // ?
