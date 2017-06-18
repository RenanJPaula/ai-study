'use strict'

const LineReader = require('line-by-line')
const utils = {}

utils.csvToJson = (csvPath) => {
  return new Promise((resolve, reject) => {
    const reader = new LineReader(csvPath)
    let attrs = null
    let parsedObjects = []

    reader.on('error', reject)

    reader.on('line', line => {
      const lineValues = line.split(',')
      if (!attrs) {
        attrs = lineValues
      } else {
        const object = {}
        for (var i = 0; i < lineValues.length; i++) {
          object[attrs[i]] = lineValues[i]
        }
        parsedObjects.push(object)
      }
    })

    reader.on('end', () => resolve(parsedObjects))
  })
}

utils.propertieToJsonBuilder = (propName) => {
  return (object) => JSON.stringify(object[propName])
}

utils.sumOccurrences = (dataset) => {
  const datasetInfo = {
    length: dataset.length,
    occurrencesMap: {}
  }

  dataset.forEach(record => {
    for (let attr in record) {
      if (!datasetInfo.occurrencesMap[attr]) datasetInfo.occurrencesMap[attr] = {}
      if (!datasetInfo.occurrencesMap[attr][record[attr]]) datasetInfo.occurrencesMap[attr][record[attr]] = 0

      datasetInfo.occurrencesMap[attr][record[attr]]++
    }
  })

  return datasetInfo
}

utils.calcIndividualProbability = (datasetInfo) => {
  const length = datasetInfo.length
  const probabilityMap = datasetInfo.probabilityMap = {}

  for (let attr in datasetInfo.occurrencesMap) {
    if (!probabilityMap[attr]) probabilityMap[attr] = {}

    for (let value in datasetInfo.occurrencesMap[attr]) {
      probabilityMap[attr][value] = (datasetInfo.occurrencesMap[attr][value] / length).toFixed(5)
    }
  }

  return datasetInfo
}

module.exports = utils
