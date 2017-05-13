'use strict'

const SETTINGS = require('./settings')
const utils = {}

utils.buildBlankBoard = (x = SETTINGS.columns, y = SETTINGS.rows) => {
  const newBoard = new Array(x)
  for (let i = 0; i <= y; i++) {
    newBoard[i] = new Array(y)
    for (let j = 0; j < y; j++) {
      newBoard[i][j] = SETTINGS.blankValue
    }
  }
  return newBoard
}

utils.cloneBoard = (board) => {
  const newBoard = []
  for (var i = 0; i < board.length; i++) {
    newBoard[i] = Array.from(board[i])
  }
  return newBoard
}

utils.printBoard = (board) => {
  let text = ''
  for (let row = 0; row < SETTINGS.rows; row++) {
    for (let column = 0; column < SETTINGS.columns; column++) {
      text += `${board[column][row]}; `
    }
    text += '\n'
  }
  console.log(text)
}

module.exports = utils
