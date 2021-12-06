import path from 'path'
import { readInputFile } from '../utils/readInput';

function hasBingo(board) {
  const isRowCompleted = board.some(row => row.every(n => n === true))
  const isColCompleted = new Array(5).fill(0)
    .reduce((completed, col) => {
      if (!completed) {
        return board.every(row => row[col] === true)
      }

      return completed
    }, false)

  return isRowCompleted || isColCompleted
}

function caculateScore(board) {
  return board.reduce((sum, row) => {
    const row_sum = row
      .filter(el => typeof el === 'number')
      .reduce((r_sum, num) => {
        return r_sum + num
      }, 0)

    return sum + row_sum
  }, 0)
}

function partOne() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const lines = data.split('\n').filter(Boolean)
  const nums = lines[0].split(',').map(n => parseInt(n))
  const boards = []

  for (let i = 1; i < lines.length; i = i + 5) {
    const board = []

    for (let j = 0; j < 5; j++) {
      const line = lines[i + j].trim().split(' ').filter(Boolean).map(n => parseInt(n))

      board.push(line)
    }

    boards.push(board)
  }

  for (const num of nums) {
    boards.forEach(board => {
      const row_index = board.findIndex(row => row.includes(num))

      if (row_index !== -1) {
        const col_index = board[row_index].findIndex(x => x === num)
        board[row_index][col_index] = true
      }
    })

    const winner_board = boards.find(board => hasBingo(board))

    if (winner_board) {
      return caculateScore(winner_board) * num
    }
  }
}

function partTwo() {
  const data = readInputFile(path.join(__dirname, 'input.txt'))
  const lines = data.split('\n').filter(Boolean)
  const nums = lines[0].split(',').map(n => parseInt(n))
  let boards = []

  for (let i = 1; i < lines.length; i = i + 5) {
    const board = []

    for (let j = 0; j < 5; j++) {
      const line = lines[i + j].trim().split(' ').filter(Boolean).map(n => parseInt(n))

      board.push(line)
    }

    boards.push(board)
  }

  for (const num of nums) {
    boards.forEach(board => {
      const row_index = board.findIndex(row => row.includes(num))

      if (row_index !== -1) {
        const col_index = board[row_index].findIndex(x => x === num)
        board[row_index][col_index] = true
      }
    })

    const winners = []
    let winnder_index = boards.findIndex(board => hasBingo(board));

    while (winnder_index !== -1) {
      winners.push(winnder_index)
      winnder_index = boards.findIndex((board, i) => hasBingo(board) && !winners.includes(i))
    }

    if (winners.length !== 0) {
      while (winners.length !== 0) {
        const winner_board_index = winners.pop()
        boards = boards.filter((_, i) => i !== winner_board_index)
      }

      if (boards.length === 1) {
        return caculateScore(boards[0]) * num
      }
    }
  }
}

partOne()
partTwo()