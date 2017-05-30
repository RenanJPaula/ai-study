'use strict'

var env = require('../src/env')
var util = require('../src/util')
var h = require('../src/ia/score-heuristic')
var State = require('../src/model/state')
var lossBoard = new State(util.parse('0,0,0,0,0,0,0;0,0,0,0,0,0,0;0,0,0,1,0,0,0;0,0,0,1,0,0,0;0,0,0,1,0,0,0;0,1,2,2,2,2,0'))

env.myId = 1
env.enemyId = 2

console.log(h.score(lossBoard))
