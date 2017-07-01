`use strict`

const utils = require('./utils')
const statistic = require('./statistic')
const path = require('path')

function resolveBC () {
  const csvPath = path.resolve(__dirname, '../bc/bc.csv')

  utils.csvToJson(csvPath).then(dataset => {
    Promise.resolve(statistic.setDataset(dataset))
           .then(statistic.calcProbMarginal('Age'))
           .then(statistic.calcProbMarginal('Location'))
           .then(statistic.calcProbCondicional('BC', ['Age', 'Location']))
           .then(() => {
             console.log(JSON.stringify(statistic.getGenetatedTable()))
           })
  })
}

resolveBC()
