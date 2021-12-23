function playPractise(start1, start2) {
  const dice = {
    rolls: 0,

    roll(times = 0) {
      this.rolls += times

      return this.rolls % 100 || 100
    }
  }

  let points1 = 0
  let points2 = 0
  let position1 = start1
  let position2 = start2

  while (true) {
    const roll1 = dice.roll(3)

    position1 = (position1 + roll1 + (roll1 - 1) + (roll1 - 2)) % 10 || 10
    points1 += position1

    if (points1 >= 1000) {
      break;
    }

    const roll2 = dice.roll(3)

    position2 = (position2 + roll2 + (roll2 - 1) + (roll2 - 2)) % 10 || 10
    points2 += position2

    if (points2 >= 1000) {
      break;
    }
  }

  return Math.min(points2, points1) * dice.rolls
}

class Player {
  constructor(pos, score = 0) {
    this.pos = pos
    this.score = score
  }

  move(dice) {
    const newPos = (this.pos + dice) % 10 || 10

    return new Player(
      newPos,
      this.score + newPos
    )
  }

  serialize() {
    return `(${this.score}-${this.pos})`
  }
}

class GameState {
  constructor(player1, player2, turn) {
    this.player1 = player1
    this.player2 = player2
    this.turn = turn
  }

  next(diceValue) {
    return new GameState(
      this.turn === true ? this.player1.move(diceValue) : this.player1,
      this.turn === false ? this.player2.move(diceValue) : this.player2,
      !this.turn
    )
  }

  winner() {
    if (this.player1.score >= 21) {
      return 1
    }

    if (this.player2.score >= 21) {
      return 2
    }

    return 0
  }

  serialize() {
    return `${this.player1.serialize()}-${this.player2.serialize()}-${this.turn ? 1 : 0}`
  }
}

function playReal(start1, start2) {
  const cache = new Map()
  const frequencies = [
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1],
  ]
  const initial = new GameState(
    new Player(start1),
    new Player(start2),
    true
  )

  function nextRound(state = initial) {
    const winner = state.winner()

    if (winner) {
      return winner === 2 ? [0, 1] : [1, 0]
    }

    if (cache.has(state.serialize())) {
      return cache.get(state.serialize())
    }

    const result = frequencies
      .map(([dice, freq]) => {
        const res = nextRound(state.next(dice))

        return [res[0] * freq, res[1] * freq]
      })
      .reduce((all, current) => {
        const [first, second] = current

        return [all[0] + first, all[1] + second]
      }, [0, 0])

    cache.set(state.serialize(), result)

    return result
  }

  return nextRound()
}

function partOne() {
  return playPractise(6, 8)
}

function partTwo() {
  return Math.max(...playReal(6, 8))
}

partOne() // ?
partTwo() // ?