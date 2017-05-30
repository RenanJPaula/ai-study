'use strict'

module.exports = {
  timebank: 1000,
  timePerMove: 1000,
  playerNames: [],
  botName: '',
  myId: 0,    // set after
  enemyId: 0, // set after
  cols: 7,
  rows: 6,
  round: 0,
  emptySlot: 0,
  winScore: 100000,
  losScore: -100000,
  alpha: Number.MIN_VALUE,
  beta: Number.MAX_VALUE,
  depth: 12, // set after
  limit: 1000,
  moveStartTime: 0 // set after
}
