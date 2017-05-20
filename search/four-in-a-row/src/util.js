'use strict'

var env = require('./env')
var util = {}

util.parse = function (stringData) {
  var board = []
  var dataArray = stringData.replace(/;/g, ',').split(',')
  var counter = 0
  for (var row = 0; row < env.rows; row++) {
    if (!board[row]) board[row] = []
    for (var col = 0; col < env.cols; col++) {
      board[row][col] = parseInt(dataArray[counter++])
    }
  }
  return board
}

module.exports = util
