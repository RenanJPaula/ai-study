`use strict`

const utils = require('./utils')
const statistic = require('./statistic')
const path = require('path')

function resolveBC () {
  const bcPropMap = require('../bc/prop-map')
  const csvPath = path.resolve(__dirname, '../bc/bc.csv')

  utils.csvToJson(csvPath).then(dataset => {
    Promise.resolve(dataset)
           .then(utils.sumOccurrences)
           .then(utils.calcIndividualProbability)
           .then(data => statistic.setMarginalProb(data.probabilityMap))
           .then(() => statistic.setDataset(dataset))
           .then(() => statistic.setPropMap(bcPropMap))
           .then(statistic.calcProbMarginal('Age'))
           .then(statistic.calcProbMarginal('Location'))
           .then(statistic.calcProbCondicional('BC', ['Age', 'Location']))
           .then(() => {
             console.log(JSON.stringify(statistic.getGenetatedTable()))
           })
  })
}

resolveBC()

// utils.csvToJson(csvPath)
//      .then(statistic.calcProbMarginal('BreastDensity'))
//      .then(statistic.getGenetatedTable)
//      .then(console.log)
