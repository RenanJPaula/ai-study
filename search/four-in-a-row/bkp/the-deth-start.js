'use strict'

var UNKNOW_COL = -1

function TheDethStar (settings) {
  this.settings = settings
}

TheDethStar.prototype.play = function () {
  var jogada = this.maxValue(this.settings.board, Number.MIN_VALUE, Number.MAX_VALUE, this.settings.depth)
  return jogada.col
}

TheDethStar.prototype.maxValue = function (board, alpha, beta, depth) {
  var score = board.score()

  if (board.isFinished(depth, score)) {
    console.log(18, { col: UNKNOW_COL, value: score })
    return { col: UNKNOW_COL, value: score }
  }

  var max = { col: UNKNOW_COL, value: Number.MIN_VALUE }

  for (var col = 0; col < this.settings.cols; col++) {
    var clonedBoard = board.copy()

    if (clonedBoard.place(col)) {
      var nextMove = this.minValue(clonedBoard, alpha, beta, depth - 1)

      if (max.col === UNKNOW_COL || nextMove.value > max.value) {
        max.col = col
        max.value = nextMove.value
        alpha = nextMove.value
      }

      if (alpha >= beta) {
        console.log(37, max)
        return max
      }
    }
  }

  console.log(43, max)
  return max
}

TheDethStar.prototype.minValue = function (board, alpha, beta, depth) {
  var score = board.score()

  if (board.isFinished(depth, score)) {
    return { col: UNKNOW_COL, value: score }
  }

  var min = { col: UNKNOW_COL, value: Number.MAX_VALUE }

  for (var col = 0; col < this.settings.cols; col++) {
    var clonedBoard = board.copy()

    if (clonedBoard.place(col)) {
      var nextMove = this.maxValue(clonedBoard, alpha, beta, depth - 1)

      if (min.col === UNKNOW_COL || nextMove.value < min.value) {
        min.col = col
        min.value = nextMove.value
        alpha = nextMove.value
      }

      if (alpha >= beta) {
        return min
      }
    }
  }

  return min
}

module.exports = TheDethStar
