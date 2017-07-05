`use strict`

Promise.all([utils.csvToJson(incompleteRecords), utils.csvToJson(completeRecords)])
       .then(convertedData => {
         const baseRecords = convertedData[0]

         baseRecords.forEach(baseRecord => {
           const targetProp = getNAProp(baseRecord)
           const dataset = convertedData[1]

           utils.calcDistanceOf(baseRecord)(dataset)
                .then(utils.sortBy('distance'))
                .then(utils.selectFirstRecords(10))
                .then(utils.meanOf(targetProp))
                .then(Math.round)
                .then(utils.assignTo(baseRecord, targetProp))
                .then(result => {
                  console.log('---------------------')
                  console.log(targetProp)
                  console.log(result)
                })
         })
       })

function getNAProp (record) {
  for (var propName in record) {
    if (record[propName] === 'NA') return propName
  }

  throw new Error('not found NA')
}
