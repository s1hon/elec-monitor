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

module.exports = {
  CHECKDBEXIST,
  FINDTIMECOUNTID,
}
