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

resolveNAs()
