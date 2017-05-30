// __main__
'use strict'

var env = require('./env')
var State = require('./model/state')
var util = require('./util')
var minMax = require('./ia/min-max')
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
var events = {}
var board = null

rl.on('line', function (input) {
  for (var envent in events) {
    if (input.startsWith(envent)) {
      var cb = events[envent]
      var params = input.split(envent).pop().trim().split(' ')
      if (cb) cb.apply(null, params)
    }
  }
})

events['settings timebank'] = function (timebank) {
  env.timebank = parseInt(timebank)
}

events['settings time_per_move'] = function (timePerMove) {
  env.timebank = parseInt(timePerMove)
}

events['settings player_names'] = function (playerNames) {
  env.playerNames = playerNames
}

events['settings your_bot'] = function (botName) {
  env.botName = botName
}

events['settings your_botid'] = function (botId) {
  env.myId = botId
  env.enemyId = botId === 1 ? 2 : 1
}

events['settings field_columns'] = function (cols) {
  env.cols = parseInt(cols)
}

events['settings field_rows'] = function (rows) {
  env.rows = parseInt(rows)
}

events['update game round'] = function (round) {
  env.round = parseInt(round)
  if (env.round < 7) {
    env.depth = 4
  } else {
    env.depth = 10
  }
}

events['update game field'] = function (field) {
  board = util.parse(field)
}

events['action move'] = function (time) {
  env.moveStartTime = new Date().getTime()
  env.limit = parseInt(time)

  console.log('place_disc ' + makeTurn(new State(board)))
}

function makeTurn (state) {
  var botPlay = minMax.max(state, env.alpha, env.beta, env.depth)
  return botPlay.col
}

module.exports = makeTurn
