'use strict'

var env = require('../env')
var util = require('../util')
var minMax = {}

minMax.max = function (state, alpha, beta, depth) {
  // if terminal (state) return utility(state)
  if (depth === 0 || !util.hasTime() || state.isTerminal()) {
    return { col: -1, score: state.score }
  }

  // initialize v = -∞
  var value = { col: -1, score: Number.MIN_VALUE }

  // for each successor of state:
  for (var col = 0; col < env.cols; col++) {
    var clonedState = state.clone()

    if (clonedState.playDiscIn(col)) {
      // v = max(v, min-value(successor, α, β))
      var sucessor = minMax.min(clonedState, alpha, beta, depth - 1)

      if (value.col === -1 || sucessor.score > value.score) {
        value.col = col
        value.score = sucessor.score
      }

      // if v ≥ β return v
      if (value.score > beta) {
        return value
      }

      // α = max(α, v)
      alpha = Math.max(alpha, value.score)
    }
  }

  // return v
  return value
}

minMax.min = function (state, alpha, beta, depth) {
  // if terminal (state) return utility(state)
  if (depth === 0 || !util.hasTime() || state.isTerminal()) {
    return { col: -1, score: state.score }
  }

  // initialize v = +∞
  var value = { col: -1, score: Number.MAX_VALUE }

  // for each successor of state:
  for (var col = 0; col < env.cols; col++) {
    var clonedState = state.clone()

    if (clonedState.playDiscIn(col)) {
      // v = min(v, max-value(successor, α, β))
      var sucessor = minMax.max(clonedState, alpha, beta, depth - 1)

      if (value.col === -1 || sucessor.score < value.score) {
        value.col = col
        value.score = sucessor.score
      }

      // if v ≤ α return v
      if (value.score <= alpha) {
        return value
      }

      // β = min(β, v)
      beta = Math.min(beta, value.score)
    }
  }

  // return v
  return value
}

module.exports = minMax
