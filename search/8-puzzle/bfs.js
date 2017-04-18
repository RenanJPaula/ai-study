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

    return simpleBfs(initialState, this.solutionState)
  }
}

function simpleBfs(initialState, solutionState) {
  int bfs(state initial)
  {
  	queue<state> q;
  	state current_state, next_state;

  	q.push(initial);
  	while (!q.empty())
  	{
  		current_state = q.front(); q.pop();
  		if (solution(current_state))
  			return 1;
  		while (next_action(&current_state, &next_state))
  		{
  			q.push(next_state);
  		}
  	}
  	return 0;
  }
}

module.exports = Bfs
