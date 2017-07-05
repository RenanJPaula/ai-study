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
           .then(statistic.calcProbCondicional('BreastDensity'))
           .then(statistic.calcProbCondicional('BC', ['Age', 'Location']))
           .then(statistic.calcProbCondicional('Metastasis', ['BC']))
           .then(statistic.calcProbCondicional('LymphNodes', ['Metastasis']))
           .then(statistic.calcProbCondicional('MC', ['BC']))
           .then(statistic.calcProbCondicional('Mass', ['BC', 'BreastDensity']))
           .then(statistic.calcProbCondicional('Size', ['Mass']))
           .then(statistic.calcProbCondicional('Shape', ['Mass']))
           .then(statistic.calcProbCondicional('FibrTissueDev', ['AD']))
           .then(statistic.calcProbCondicional('SkinRetract', ['FibrTissueDev', 'BC']))
           .then(statistic.calcProbCondicional('NippleDischarge', ['FibrTissueDev', 'BC']))
           .then(statistic.calcProbCondicional('Spiculation', ['FibrTissueDev']))
           .then(statistic.calcProbCondicional('Margin', ['Mass', 'Spiculation']))
           .then(() => {
             console.log(JSON.stringify(statistic.getGenetatedTable()))
           })
  })
}

resolveBC()
