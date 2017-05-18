'use strict'

var Board = require('./board')
var options = {
  player: 1,
  cols: 7,
  rows: 6
}

function testHorizontalWin () {
  options.value = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0]
  ]

  var colToPlay = new Board(options).play()
  console.log('Horizontal win possibility', colToPlay === 2 || colToPlay === 6)
}

function testVerticalWin () {
  options.value = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 2, 2]
  ]

  var colToPlay = new Board(options).play()
  console.log('Vertical win possibility', colToPlay === 3)
}

function testDiagonalRightBottom () {
  options.value = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 2, 1, 2, 2, 1, 0],
    [1, 1, 2, 1, 1, 1, 2]
  ]

  var colToPlay = new Board(options).play()
  console.log('Diagonal right-bottom win possibility', colToPlay === 4)
}

function testDiagonalLeftBottom () {
  options.value = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 1, 0, 0],
    [2, 1, 2, 1, 2, 1, 0],
    [1, 2, 2, 1, 2, 1, 1]
  ]

  var colToPlay = new Board(options).play()
  console.log('Diagonal left-bottom win possibility', colToPlay === 3)
}

testHorizontalWin()
testVerticalWin()
testDiagonalRightBottom()
testDiagonalLeftBottom()
