'use strict'

const statistic = {}
const table = {}
let dataset = null

statistic.setDataset = (obj) => {
  dataset = obj
  return Promise.resolve()
}

statistic.getGenetatedTable = () => table

statistic.calcProbCondicional = (node = '', dependencies = []) => {
  return () => {
    const propTable = table[node] = {}
    let processQtd = 0
    sumOccurrences()
    normalizeValues(propTable)

    function sumOccurrences () {
      dataset.forEach(record => {
        if (!propTable[record[node]]) propTable[record[node]] = {}
        let prop = propTable[record[node]]

        dependencies.forEach((dependencie, i) => {
          if (i === dependencies.length - 1) {
            if (!prop[record[dependencie]]) prop[record[dependencie]] = 0
            prop[record[dependencie]]++
            processQtd++
          } else {
            if (!prop[record[dependencie]]) prop[record[dependencie]] = {}
            prop = prop[record[dependencie]]
          }
        })
      })
    }

    function normalizeValues (obj) {
      for (var prop in obj) {
        const value = obj[prop]
        if (typeof value === 'object') {
          normalizeValues(value)
        } else {
          obj[prop] = value / processQtd
        }
      }
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
