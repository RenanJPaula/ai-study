`use strict`

const utils = require('./utils')
const path = require('path')
const incompleteRecords = path.resolve(__dirname, '../nhl/datasets/nhl-only-na.csv')
const completeRecords = path.resolve(__dirname, '../nhl/datasets/nhl-without-na.csv')

Promise.all([utils.csvToJson(incompleteRecords), utils.csvToJson(completeRecords)])
       .then(convertedData => {
         const baseRecord = convertedData[0][0]
         const dataset = convertedData[1]

         utils.calcDistanceOf(baseRecord)(dataset)
       })
