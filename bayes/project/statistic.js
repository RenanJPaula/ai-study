'use strict'

const statistic = {}
const table = {}
let marginalProb = null
let dataset = null
let propMap = null

statistic.setMarginalProb = (obj) => {
  marginalProb = obj
  return Promise.resolve()
}

statistic.setDataset = (obj) => {
  dataset = obj
  return Promise.resolve()
}

statistic.setPropMap = (obj) => {
  propMap = obj
  return Promise.resolve()
}

statistic.getGenetatedTable = () => table

statistic.calcProbCondicional = (node = '', dependencies = []) => {
  return () => {
    const propTable = table[node] = {}

    dataset.forEach(record => {
      let propName = record[node]

      dependencies.forEach(dependencie => {
        propName += ` ${record[dependencie]}`
      })

      if (!propTable[propName]) propTable[propName] = 0
      propTable[propName]++
    })

    for (var prop in propTable) {
      propTable[prop] = (propTable[prop] / dataset.length).toFixed(5)
    }
  }
}

statistic.calcProbMarginal = function calcProbMarginal (attrName) {
  return () => {
    const length = dataset.length
    const probTable = table[attrName] = {}

    for (var i = 0; i < length; i++) {
      const value = dataset[i][attrName]
      if (!probTable[value]) probTable[value] = 0
      probTable[value]++
    }

    for (var prop in probTable) {
      probTable[prop] = (probTable[prop] / length).toFixed(5)
    }
  }
}

module.exports = statistic
