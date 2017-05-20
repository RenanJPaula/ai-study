'use strict'

var State = require('../src/model/state')
var bot = require('../src/main')

function testCopyBoard () {
  var state = new State([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ])

  var copy = state.clone()
  var isNotEqual = copy.board !== state.board && state !== copy
  console.log('Clone Test: ', isNotEqual)
}

function testIsFull () {
  var state = new State([
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ])

  console.log('Is Full Test: ', state.isFull())
}

testCopyBoard()
testIsFull()

function testHorizontalWin () {
  var state = new State([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0]
  ])

  var colToPlay = bot(state)
  console.log('Horizontal win possibility', colToPlay === 2 || colToPlay === 6)
}

function testVerticalWin () {
  var state = new State([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 2, 2]
  ])

  var colToPlay = bot(state)
  console.log('Vertical win possibility', colToPlay === 3)
}

function testDiagonalRightBottom () {
  var state = new State([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 2, 1, 2, 2, 1, 0],
    [1, 1, 2, 1, 1, 1, 2]
  ])

  var colToPlay = bot(state)
  console.log('Diagonal right-bottom win possibility', colToPlay === 4)
}

function testDiagonalLeftBottom () {
  var state = new State([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 1, 0, 0],
    [2, 1, 2, 1, 2, 1, 0],
    [1, 2, 2, 1, 2, 1, 1]
  ])

  var colToPlay = bot(state)
  console.log('Diagonal left-bottom win possibility', colToPlay === 3)
}

testHorizontalWin()
testVerticalWin()
testDiagonalRightBottom()
testDiagonalLeftBottom()
