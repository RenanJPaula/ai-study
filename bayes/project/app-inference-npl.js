`use strict`

const utils = require('./utils')
const path = require('path')
const incompleteRecords = path.resolve(__dirname, '../nhl/datasets/nhl-only-na.csv')
const completeRecords = path.resolve(__dirname, '../nhl/datasets/nhl-without-na.csv')

Promise.all([utils.csvToJson(incompleteRecords), utils.csvToJson(completeRecords)])
       .then(convertedData => {
         const baseRecords = convertedData[0]

         baseRecords.forEach(baseRecord => {
           const dataset = convertedData[1]

           utils.calcDistanceOf(baseRecord)(dataset)
                .then(utils.sortBy('distance'))
                .then(console.log)
         })
       })
