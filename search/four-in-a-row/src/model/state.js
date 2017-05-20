'use strict'

var heuristic = require('../ia/score-heuristic')
var env = require('../env')

var State = function constructor (board, myId) {
  this.board = board
  this.myId = myId || env.myId
}

Object.defineProperty(State.prototype, 'score', {
  get: function () {
    if (!this._score) this._score = heuristic.score(this)
    return this._score
  },
  set: function (score) { this._score = score }
})

State.prototype.utility = function () {
  return 0
}

State.prototype.isTerminal = function () {
  return this.score === env.winScore ||
         this.score === env.losScore ||
         this.isFull()
}

State.prototype.isFull = function () {
  for (var col = 0; col < env.cols; col++) {
    if (this.isValidMove(col)) {
      return false
    }
  }
  return true
}

State.prototype.isValidMove = function (col) {
  return this.board[0][col] === env.emptySlot
}

State.prototype.clone = function () {
  var newStete = []

  for (var i = 0; i < env.rows; i++) {
    newStete[i] = [].concat(this.board[i])
  }

  return new State(newStete, this.myId)
}

State.prototype.playDiscIn = function (col) {
  if (this.isValidMove(col) && col >= 0 && col < env.cols) {
    for (var row = env.rows - 1; row >= 0; row--) {
      if (this.board[row][col] === env.emptySlot) {
        this.board[row][col] = this.myId
        break
      }
    }
    this.myId = this.switchRound(this.myId)
    return true
  } else {
    return false
  }
}

State.prototype.switchRound = function (myId) {
  return myId === env.myId ? env.enemyId : env.myId
}

module.exports = State
