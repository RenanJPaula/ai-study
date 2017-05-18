'use strict'

var EMPTY_SLOT = 0
var SCORE = 100000
var Board = function (value, settings) {
  this.value = value
  this.myId = settings.player
  this.enemyId = settings.myId === 1 ? 2 : 1
  this.cols = settings.cols
  this.rows = settings.rows
  this.depth = settings.depth
}

Board.prototype.from = function (stringData) {
  var dataArray = stringData.replace(/;/g, ',').split(',')
  var counter = 0
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols; col++) {
      this.value[row][col] = parseInt(dataArray[counter++])
    }
  }
}

Board.prototype.place = function (col) {
  if (this.isValidMove(col) && col >= 0 && col < this.cols) {
    for (var row = this.rows - 1; row >= 0; row--) {
      if (this.value[row][col] === EMPTY_SLOT) {
        this.value[row][col] = this.myId
        break
      }
    }
    this.myId = this.switchRound(this.myId)
    return true
  } else {
    return false
  }
}

Board.prototype.switchRound = function (round) {
  return round === 1 ? 2 : 1
}

Board.prototype.scorePosition = function (row, col, deltaY, deltaX) {
  var enemyPoints = 0
  var myPoints = 0

  for (var i = 0; i < 4; i++) {
    if (this.value[row][col] === this.enemyId) {
      enemyPoints++
    } else if (this.value[row][col] === this.myId) {
      myPoints++
    }

    row += deltaY
    col += deltaX
  }

  if (enemyPoints === 4) {
    return -SCORE
  } else if (myPoints === 4) {
    return SCORE
  } else {
    return myPoints
  }
}

Board.prototype.scoreVertical = function () {
  var scoreVertical = 0

  for (var row = 0; row < this.rows - 3; row++) {
    for (var col = 0; col < this.cols; col++) {
      var score = this.scorePosition(row, col, 1, 0)
      if (score === SCORE || score === -SCORE) {
        return score
      }
      scoreVertical += score
    }
  }

  return scoreVertical
}

Board.prototype.scoreHorizontal = function () {
  var scoreHorizontal = 0
  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols - 3; col++) {
      var score = this.scorePosition(row, col, 0, 1)
      if (score === SCORE || score === -SCORE) {
        return score
      }
      scoreHorizontal += score
    }
  }

  return scoreHorizontal
}

Board.prototype.scoreDiagonalLeftBottom = function () {
  var scoreDiagonalLeftBottom = 0
  for (var row = 0; row < this.rows - 3; row++) {
    for (var col = 0; col < this.cols - 3; col++) {
      var score = this.scorePosition(row, col, 1, 1)
      if (score === SCORE || score === -SCORE) {
        return score
      }
      scoreDiagonalLeftBottom += score
    }
  }

  return scoreDiagonalLeftBottom
}

Board.prototype.scoreDiagonalRightBottom = function () {
  var scoreDiagonalRightBottom = 0
  for (var row = 3; row < this.rows; row++) {
    for (var col = 0; col <= this.cols - 4; col++) {
      var score = this.scorePosition(row, col, -1, +1)
      if (score === SCORE || score === -SCORE) {
        return score
      }
      scoreDiagonalRightBottom += score
    }
  }
  return scoreDiagonalRightBottom
}

Board.prototype.score = function () {
  return this.scoreVertical() +
         this.scoreHorizontal() +
         this.scoreDiagonalLeftBottom() +
         this.scoreDiagonalRightBottom()
}

Board.prototype.isFinished = function (depth, score) {
  if (depth === 0 || score === SCORE || score === -SCORE || this.isFull()) {
    return true
  }
  return false
}

Board.prototype.isFull = function () {
  for (var col = 0; col < this.cols; col++) {
    if (this.isValidMove(col)) {
      return false
    }
  }
  return true
}

Board.prototype.isValidMove = function (col) {
  return this.value[0][col] === EMPTY_SLOT
}

Board.prototype.copy = function () {
  var newValue = []

  for (var i = 0; i < this.value.length; i++) {
    newValue[i] = [].concat(this.value[i])
  }
  return new Board(newValue, {
    player: this.myId,
    cols: this.cols,
    rows: this.rows,
    depth: this.depth
  })
}

module.exports = Board
