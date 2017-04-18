'use strict'

class Bfs {
  constructor (solutionState = null) {
    this._solutionState = solutionState
  }

  get solutionState () {
    return this._solutionState
  }

  solve (initialState) {
    if (!this.solutionState) throw new Error('Solution state is required to solve.')
    if (!initialState) throw new Error('Inital state is required to solve.')
    this.solutionSet = {}
    return withoutRevisitNodesBfs(initialState, this.solutionState, this.solutionSet)
  }

  print () {
    let steps = []
    let aux = this.solutionSet[this.solutionState.toString()]

    while (aux) {
      steps.push(aux)
      aux = this.solutionSet[aux]
    }

    steps = steps.reverse()
    steps.push(this.solutionState.toString())
    console.log(steps.join('\n'))
  }
}

function withoutRevisitNodesBfs (initialState, solutionState, solutionSet = {}) {
  const queue = [ initialState ]
  const visitedStates = {}
  solutionSet[initialState.toString()] = null

  function isNotVisited (state) {
    return !visitedStates[state.toString()]
  }

  while (queue.length > 0) {
    let state = queue.pop()
    visitedStates[state.toString()] = true

    if (state.isSolve(solutionState)) return true

    state.getNextActions()
         .forEach(nexState => {
           if (isNotVisited(nexState)) {
             solutionSet[nexState.toString()] = state.toString()
             queue.push(nexState)
           }
         })
  }

  return false
}

module.exports = Bfs
