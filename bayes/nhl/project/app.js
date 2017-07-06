'use strict'

const utils = require('./utils')
const statistic = require('./statistic')
const path = require('path')

function resolveNAs () {
  Promise.all([
    utils.csvToJson(path.resolve(__dirname, '../datasets/nhl-only-na.csv')),
    utils.csvToJson(path.resolve(__dirname, '../datasets/nhl-without-na.csv'))
  ]).then(datasets => {
    const incompleteRecords = datasets[0]
    const completeRecords = datasets[1]

    incompleteRecords.forEach(incompleteRecord => {
      const naProp = utils.getNAProp(incompleteRecord)
      statistic.calcDistanceOf(incompleteRecord, completeRecords)
      utils.sortBy('distance')(completeRecords)
      const kDataset = utils.selectFirstRecords(10)(completeRecords)
      utils.meanOf(naProp)(kDataset)
      incompleteRecord[naProp] = Math.round(utils.meanOf(naProp)(kDataset))
    })

    incompleteRecords.forEach(incompleteRecord => {
      completeRecords.push(incompleteRecord)
    })

    console.log(JSON.stringify(completeRecords))
  })
}

function resolveNhl () {
  const dataset = require('../datasets/nhl-completed-dataset.json')

  Promise.resolve(statistic.setDataset(dataset))
   .then(statistic.calcProbMarginal('AGE'))
   .then(statistic.calcProbMarginal('CLINICAL_PRESENTATION'))
   .then(statistic.calcProbMarginal('CT&RT_SCHEDULE'))
   .then(statistic.calcProbMarginal('SURGERY'))
   .then(statistic.calcProbCondicional('GENERAL_HEALTH_STATUS', ['AGE']))
   .then(statistic.calcProbCondicional('BULKY_DISEASE', ['AGE', 'HISTOLOGICAL_CLASSIFICATION', 'CLINICAL_STAGE']))
   .then(statistic.calcProbCondicional('HISTOLOGICAL_CLASSIFICATION', ['AGE']))
   .then(statistic.calcProbCondicional('CLINICAL_STAGE', ['AGE']))
   .then(statistic.calcProbCondicional('CLINICAL_STAGE', ['AGE']))
   .then(statistic.calcProbCondicional('BM_DEPRESSION', ['AGE', 'CT&RT_SCHEDULE']))
   .then(statistic.calcProbCondicional('PERFORATION', ['CT&RT_SCHEDULE']))
   .then(statistic.calcProbCondicional('HEMORRHAGE', ['CT&RT_SCHEDULE']))
   .then(statistic.calcProbCondicional('EARLY_RESULT', ['BULKY_DISEASE', 'HISTOLOGICAL_CLASSIFICATION', 'CLINICAL_STAGE', 'CT&RT_SCHEDULE', 'SURGERY', 'THERAPY_ADJUSTMENT']))
   .then(statistic.calcProbCondicional('THERAPY_ADJUSTMENT', ['BM_DEPRESSION', 'PERFORATION', 'HEMORRHAGE']))
   .then(statistic.calcProbCondicional('5_YEAR_RESULT', ['AGE', 'BULKY_DISEASE', 'HISTOLOGICAL_CLASSIFICATION', 'CLINICAL_STAGE', 'EARLY_RESULT']))
   .then(() => {
     console.log(JSON.stringify(statistic.getGenetatedTable()))
   })
}

resolveNhl()
