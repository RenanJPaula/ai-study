'use strict'
// __main__

var parser = require('./parser')
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
var Bot = require('./the-deth-start')

rl.on('line', function (input) {
  parser.exec(input)
})

parser.on('settings', function (prop, value) {

})

parser.on('update', function () {

})

parser.on('action', function (actionName, time) {
  console.log('place_disc ' + new Bot().play())
})
