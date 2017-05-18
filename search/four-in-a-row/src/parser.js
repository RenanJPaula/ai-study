'use strict'

var parser = {}

parser.listeners = {}

parser.on = function (cmd, cb) {
  parser.listeners[cmd] = cb
}

parser.exec = function (input) {
  var cmd = input.split(' ')
  var cb = parser.listeners[cmd[0]]
  if (cb) cb.apply(cmd.slice(1))
}

module.exports = parser
