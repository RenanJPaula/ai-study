'use strict'

var env = require('../env')

module.exports.score = function (state) {
  var board = state.board
  var row = 0
  var col = 0
  var score

  var scoreVertical = 0
  for (row = 0; row < env.rows - 3; row++) {
    for (col = 0; col < env.cols; col++) {
      score = scorePosition(board, row, col, 1, 0)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreVertical += score
    }
  }

  var scoreHorizontal = 0
  for (row = 0; row < env.rows; row++) {
    for (col = 0; col < env.cols - 3; col++) {
      score = scorePosition(board, row, col, 0, 1)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreHorizontal += score
    }
  }

  var scoreDiagonalLeftBottom = 0
  for (row = 0; row < env.rows - 3; row++) {
    for (col = 0; col < env.cols - 3; col++) {
      score = scorePosition(board, row, col, 1, 1)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreDiagonalLeftBottom += score
    }
  }

  var scoreDiagonalRightBottom = 0
  for (row = 3; row < env.rows; row++) {
    for (col = 0; col <= env.cols - 3; col++) {
      score = scorePosition(board, row, col, -1, +1)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreDiagonalRightBottom += score
    }
  }

  return scoreVertical + scoreHorizontal + scoreDiagonalLeftBottom + scoreDiagonalRightBottom
}

function scorePosition (board, row, col, deltaY, deltaX) {
  var enemyPoints = 0
  var myPoints = 0

  for (var i = 0; i < 4; i++) {
    if (board[row][col] === env.enemyId) {
      enemyPoints++
    } else if (board[row][col] === env.myId) {
      myPoints++
    }

    row += deltaY
    col += deltaX
  }

  if (enemyPoints === 4) {
    return env.losScore
  } else if (myPoints === 4) {
    return env.winScore
  } else {
    return myPoints
  }
}
