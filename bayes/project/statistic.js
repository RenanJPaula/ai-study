'use strict'

const propMap = require('../bc/prop-map')
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
    transformInPercent(propTable)

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
          obj[prop] = parseFloat((value / processQtd).toFixed(5))
        }
      }
    }

    function transformInPercent (obj) {
      const sumMap = {}
      propMap[node].forEach((prop) => sumValues(obj[prop]))
      propMap[node].forEach((prop) => divideBySum(obj[prop]))

      function sumValues (obj, stack = '') {
        for (let property in obj) {
          if (typeof obj[property] === 'object') {
            sumValues(obj[property], stack + '.' + property)
          } else {
            const key = stack + '.' + property
            if (!sumMap[key]) sumMap[key] = 0
            sumMap[key] += obj[property]
          }
        }
      }

      function divideBySum (obj, stack = '') {
        for (let property in obj) {
          if (typeof obj[property] === 'object') {
            divideBySum(obj[property], stack + '.' + property)
          } else {
            const key = stack + '.' + property
            obj[property] = parseFloat((obj[property] / sumMap[key]).toFixed(5))
          }
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
      probTable[prop] = parseFloat((probTable[prop] / length).toFixed(5))
    }
  }
}

module.exports = statistic
