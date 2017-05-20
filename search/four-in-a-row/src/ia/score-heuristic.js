'use strict'

var env = require('../env')

module.exports.score = function (state) {
  var mScoreVertical = scoreVertical(state.board)
  if (mScoreVertical === env.winScore || mScoreVertical === env.losScore) return mScoreVertical

  var mScoreHorizontal = scoreHorizontal(state.board)
  if (mScoreHorizontal === env.winScore || mScoreHorizontal === env.losScore) return mScoreHorizontal

  var mScoreDiagonalLeftBottom = scoreDiagonalLeftBottom(state.board)
  if (mScoreDiagonalLeftBottom === env.winScore || mScoreDiagonalLeftBottom === env.losScore) return mScoreDiagonalLeftBottom

  var mScoreDiagonalRightBottom = scoreDiagonalRightBottom(state.board)
  if (mScoreDiagonalRightBottom === env.winScore || mScoreDiagonalRightBottom === env.losScore) return mScoreDiagonalRightBottom

  return mScoreVertical + mScoreHorizontal + mScoreDiagonalLeftBottom + mScoreDiagonalRightBottom
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

function scoreVertical (board) {
  var scoreVertical = 0

  for (var row = 0; row < env.rows - 3; row++) {
    for (var col = 0; col < env.cols; col++) {
      var score = scorePosition(board, row, col, 1, 0)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreVertical += score
    }
  }

  return scoreVertical
}

function scoreHorizontal (board) {
  var scoreHorizontal = 0
  for (var row = 0; row < env.rows; row++) {
    for (var col = 0; col < env.cols - 3; col++) {
      var score = scorePosition(board, row, col, 0, 1)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreHorizontal += score
    }
  }

  return scoreHorizontal
}

function scoreDiagonalLeftBottom (board) {
  var scoreDiagonalLeftBottom = 0
  for (var row = 0; row < env.rows - 3; row++) {
    for (var col = 0; col < env.cols - 3; col++) {
      var score = scorePosition(board, row, col, 1, 1)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreDiagonalLeftBottom += score
    }
  }

  return scoreDiagonalLeftBottom
}

function scoreDiagonalRightBottom (board) {
  var scoreDiagonalRightBottom = 0
  for (var row = 3; row < env.rows; row++) {
    for (var col = 0; col <= env.cols - 4; col++) {
      var score = scorePosition(board, row, col, -1, +1)
      if (score === env.winScore || score === env.losScore) {
        return score
      }
      scoreDiagonalRightBottom += score
    }
  }

  return scoreDiagonalRightBottom
}
