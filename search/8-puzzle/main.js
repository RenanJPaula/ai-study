'use strict'

const State = require('./state')
const Bfs = require('./bfs')

const initialState = new State([[1, 2, 3],
                                [4, 0, 5],
                                [8, 6, 7]])

const solutionState = new State([[1, 2, 3],
                                 [4, 0, 5],
                                 [6, 7, 8]])

initialState.getNextActions().forEach(state => state.print())

new Bfs(solutionState).solve(initialState)
