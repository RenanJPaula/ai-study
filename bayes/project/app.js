`use strict`

const utils = require('./utils')
const path = require('path')

utils.csvToJson(path.resolve(__dirname, '../bc.csv'))
     .then(utils.sumOccurrences)
     .then(utils.calcIndividualProbability)
     .then(utils.propertieToJsonBuilder('probabilityMap'))
     .then(console.log)
