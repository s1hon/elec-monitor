const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://120.108.111.174:27017/'

// MongoClient.connect(url, function(err, db) {
//   console.log("Connected correctly to server")
//
//   db.close()
// })

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

const getConditionData = (condition) => {
  return new Promise((resolve, reject) => {
    condition.find({}).sort({ count: -1 }).limit(1).toArray((error, conditionDATA) => {
      if (error) reject('condition', error)
      resolve(conditionDATA[0].count)
    })
  })
}

const getRawdataRecord = (db, countID) => {
  return new Promise((resolve, reject) => {
    db.find({ count: countID }).toArray((error, raw) => {
      if (error) reject(`countID-${countID}`, error)
      resolve(raw, countID)
    })
  })
}

module.exports = {
  getdbLists,
  getConditionData,
  getRawdataRecord,
}
