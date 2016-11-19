const dbLib = require('../../mongodbLib')

const CHECKDBEXIST = async (req, res) => {
  // Check dbname if exist.
  try {
    const dbs = await dbLib.getdbLists()
    if (dbs.indexOf(req.params.dbname) === -1) {
      res.status(400).json({
        msg: {
          name: 'MongoError',
          message: `Couldn't find database ${req.params.dbname}. Please try again.`,
        },
      })
      return
    }
  } catch (e) {
    res.status(400).json({
      msg: e,
    })
  }
}

const FINDTIMECOUNTID = (db, start, end) => {
  return new Promise((resolve, reject) => {
    const condition = db.collection('condition')
    // $gt means >, $lt means <
    const command = condition.find({
      time: {
        $gt: parseInt(start, 10),
        $lt: parseInt(end, 10),
      },
    })
    command.toArray((error, raw) => {
      if (error) reject('countID', error)
      resolve(raw.length)
    })
  })
}

const FINDTIMEBEGIN = (condition) => {
  return new Promise((resolve, reject) => {
    // $gt means >, $lt means <
    condition.find({ time: { $exists: 1 } }).sort({ time: 1 })
      .limit(1).toArray((error, raw) => {
        if (error) reject(error)
        if (raw[0]) {
          resolve(raw[0].time)
        }
      })
  })
}

const FINDTIMEEND = (condition) => {
  return new Promise((resolve, reject) => {
    // $gt means >, $lt means <
    condition.find({ time: { $exists: 1 } }).sort({ time: -1 })
      .limit(1).toArray((error, raw) => {
        if (error) reject(error)
        if (raw[0]) {
          resolve(raw[0].time)
        }
      })
  })
}


const FINDTIMERANGE = (db) => {
  return new Promise(async (resolve, reject) => {
    const condition = db.collection('condition')
    // $gt means >, $lt means <
    try {
      const begin = await FINDTIMEBEGIN(condition)
      const end = await FINDTIMEEND(condition)

      resolve({
        begin,
        end,
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  CHECKDBEXIST,
  FINDTIMECOUNTID,
  FINDTIMERANGE,
}
