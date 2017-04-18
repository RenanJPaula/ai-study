'use strict'

const BORD_SIZE = 3
const BLANK_SPACE = 0

class State {
  constructor (board) {
    this.board = board
  }

  set board (board) {
    if (!board) throw new Error(`${BORD_SIZE}x${BORD_SIZE} matrix is required!`)
    this._board = board
  }

  get board () {
    return this._board
  }

  getNextActions () {
    const blankCoordinate = getBlanCoordinate(this.board)
    const moveSet = [
      { x: blankCoordinate.x - 1, y: blankCoordinate.y },
      { x: blankCoordinate.x, y: blankCoordinate.y + 1 },
      { x: blankCoordinate.x + 1, y: blankCoordinate.y },
      { x: blankCoordinate.x, y: blankCoordinate.y - 1 }
    ]

    return moveSet.filter(destCoordinate => isValidCoordinate(destCoordinate))
                  .map(destCoordinate => new State(swap(this.board, blankCoordinate, destCoordinate)))
  }

  isSolve (solutionState) {
    for (let i = 0; i < BORD_SIZE; i++) {
      for (let j = 0; j < BORD_SIZE; j++) {
        if (this.board[i][j] !== solutionState.board[i][j]) {
          return false
        }
      }
    }
    return true
  }

  toString () {
    return this.board.reduce((previousValue, currentValue) => {
      previousValue += currentValue.join(' | ')
      previousValue += '\n'
      return previousValue
    }, '')
  }
}

function isValidCoordinate (coordinate) {
  return coordinate.x >= 0 && coordinate.x < BORD_SIZE &&
         coordinate.y >= 0 && coordinate.y < BORD_SIZE
}

function getBlanCoordinate (board) {
  for (let x = 0; x < BORD_SIZE; x++) {
    for (let y = 0; y < BORD_SIZE; y++) {
      if (board[x][y] === BLANK_SPACE) {
        return { x, y }
      }
    }
  }
  throw new Error('Blank space not found!')
}

function swap (board, location, dest) {
  const newBoard = board.map(line => line.slice(0))

  const aux = newBoard[dest.x][dest.y]
  newBoard[dest.x][dest.y] = newBoard[location.x][location.y]
  newBoard[location.x][location.y] = aux

  return newBoard
}

module.exports = State
