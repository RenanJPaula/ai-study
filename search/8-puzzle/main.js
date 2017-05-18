'use strict'

const State = require('./state')
const Bfs = require('./bfs')
const Dfs = require('./dfs')

const initialState = new State([[1, 2, 3],
                                [4, 0, 5],
                                [8, 6, 7]])

const solutionState = new State([[0, 1, 2],
                                 [3, 4, 5],
                                 [6, 7, 8]])

const solver = new Bfs(solutionState)
solver.solve(initialState)
solver.print()
