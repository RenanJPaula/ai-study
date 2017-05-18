'use strict'

var Board = function (settings, value) {
  this.settings = settings
  this.value = value
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

Board.prototype.play = function () {
  return 0
}

module.exports = Board
