const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://120.108.111.174:27017/'


/**
 * Get db lists
 * @return {Array} dbList
 */
const getdbLists = () => {
  return new Promise((reslove, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err)
        return
      }

      db.admin().listDatabases((error, dbs) => {
        if (error) {
          reject(error)
          return
        }
        let dbList = []
        dbs.databases.map((obj) => {
          if (obj.name.match(/^site/)) {
            dbList.push(obj.name)
          }
        })
        dbList = dbList.sort()
        reslove(dbList)
        db.close()
      })
    })
  })
}


/**
 * Get newtest conditiondata
 * @param  {String} condition
 * @return {String} conditionInfo conditionDATA[0]
 */
const getConditionData = (condition) => {
  return new Promise((resolve, reject) => {
    condition.find({}).sort({ count: -1 }).limit(1).toArray((error, conditionDATA) => {
      if (error) reject('condition', error)
      resolve(conditionDATA[0])
    })
  })
}


/**
 * To get Rawdata record
 * @param  {DB} db
 * @param  {Int} countID countID from getConditionData
 * @return {Array} raw  Rawdata
 */
const getRawdataRecord = (db, countID, limit) => {
  return new Promise((resolve, reject) => {
    let command = db.find({ count: countID }, { _id: 0, count: 0 }).sort({ rowid: 1 })
    if (limit) {
      command = command.limit(limit)
    }
    command.toArray((error, raw) => {
      if (error) reject(`countID-${countID}`, error)
      resolve(raw, countID)
    })
  })
}


/**
 * getAverage with [powersignal, fundamental, power]
 * @param  {Array} data
 * @return {Float} average
 */
const getAverage = (data) => {
  return new Promise((resolve) => {
    if (data.length === 0) {
      resolve(0)
    }
    if (data.length > 1) {
      data.reduce((previousValue, currentValue, index, array) => {
        if (index === array.length - 1) {
          const total = parseFloat(previousValue.data, 10) + parseFloat(currentValue.data, 10)
          resolve((total / array.length).toFixed(2))
        }
        return { data: parseFloat(previousValue.data, 10) + parseFloat(currentValue.data, 10) }
      })
    }
  })
}

module.exports = {
  getdbLists,
  getConditionData,
  getRawdataRecord,
  getAverage,
}
