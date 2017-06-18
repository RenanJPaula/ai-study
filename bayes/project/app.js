`use strict`

const utils = require('./utils')
const path = require('path')
const csvPath = path.resolve(__dirname, '../nhl.csv')

utils.csvToJson(csvPath)
     .then(utils.sumOccurrences)
     .then(utils.calcIndividualProbability)
     .then(utils.propertieToJson('probabilityMap'))
     .then(console.log)
