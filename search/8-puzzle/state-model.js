'use strict'

const BORD_SIZE = 3

class State {
  constructor () {
    this.board = []
    for (let i = 0; i < BORD_SIZE; i++) { this.board[i] = new Array(BORD_SIZE) }
  }

  nextActions () {
    const actions = []

    return actions
  }

  swap (location, dest) {
    this.board[dest.x][dest.y] = this.board[location.x][location.y]
    this.board[location.x][location.y] = 0
  }

  isSolve (board) {
    for (let i = 0; i < BORD_SIZE; i++) {
      for (let j = 0; j < BORD_SIZE; j++) {
        if (this.board[i][j] !== board[i][j]) {
          return false
        }
      }
    }
    return true
  }

  print () {
    for (let i = 0; i < BORD_SIZE; i++) {
      console.log(this.board[i].join(' | '))
    }
  }
}

new State().print()

module.exports = State
