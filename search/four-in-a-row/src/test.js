'use strict'

var Board = require('./board')
var Bot = require('./the-deth-start')
var options = {
  player: 1,
  cols: 7,
  rows: 6,
  depth: 1
}

function testHorizontalWin () {
  options.board = new Board([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0]
  ], options)

  var colToPlay = new Bot(options).play()
  console.log('Horizontal win possibility', colToPlay === 2 || colToPlay === 6)
}

function testVerticalWin () {
  options.board = new Board([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 2, 2]
  ], options)

  var colToPlay = new Bot(options).play()
  console.log('Vertical win possibility', colToPlay === 3)
}

function testDiagonalRightBottom () {
  options.board = new Board([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 2, 1, 2, 2, 1, 0],
    [1, 1, 2, 1, 1, 1, 2]
  ], options)

  var colToPlay = new Bot(options).play()
  console.log('Diagonal right-bottom win possibility', colToPlay === 4)
}

function testDiagonalLeftBottom () {
  options.board = new Board([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 1, 0, 0],
    [2, 1, 2, 1, 2, 1, 0],
    [1, 2, 2, 1, 2, 1, 1]
  ], options)

  var colToPlay = new Bot(options).play()
  console.log('Diagonal left-bottom win possibility', colToPlay === 3)
}

function testCopyBoard () {
  options.board = new Board([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ], options)

  options.board.copy().value[0][0] = 1
  console.log('Copy board', options.board.value[0][0] === 0)
}

function testPlaceInBoard () {
  options.board = new Board([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ], options)

  options.board.place(0)
  console.log('Place In Board', options.board.value[5][0] === 1)
}

testHorizontalWin()
testVerticalWin()
testDiagonalRightBottom()
testDiagonalLeftBottom()
testCopyBoard()
testPlaceInBoard()
