'use strict'

const SETTINGS = require('./settings')
const utils = require('./utils')

class State {
  constructor (board) {
    this._board = board || utils.buildBlankBoard()
  }

  get board () {
    return this._board
  }

  getNextStates () {
    const nextStates = []
    for (let column = 0; column < SETTINGS.columns; column++) {
      const lastBlankPositionInRow = this.board[column].lastIndexOf(SETTINGS.blankValue)

      if (lastBlankPositionInRow === SETTINGS.rows - 1) {
        const newBoard = utils.cloneBoard(this.board)
        newBoard[column][lastBlankPositionInRow] = 1
        nextStates.push(new State(newBoard))
      }
    }

    return nextStates
  }
}

new State().getNextStates()

module.exports = State
