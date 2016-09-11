const express = require('express')
const MongoClient = require('mongodb').MongoClient
const dbLib = require('../../mongodbLib')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ msg: 'ok' })
})


/**
 * [Route] Get db lits
 */
router.get('/list', async (req, res) => {
  const dbs = await dbLib.getdbLists()
  res.json({
    status: '200',
    msg: 'Success',
    data: dbs,
  })
})


/**
 * [Route] Get rawdata, dfs... datas
 * @type {String} dbname
 */
router.get('/rawdata/:dbname', async (req, res) => {
  // Check dbname if exist.
  try {
    const dbs = await dbLib.getdbLists()
    if (dbs.indexOf(req.params.dbname) === -1) {
      res.json({
        status: '400',
        msg: {
          name: 'MongoError',
          message: `Couldn't find database ${req.params.dbname}. Please try again.`,
        },
      })
      return
    }
  } catch (e) {
    res.json({
      status: '400',
      msg: e,
    })
  }

  // If exist, get datas.
  const url = `mongodb://120.108.111.174:27017/${req.params.dbname}`
  MongoClient.connect(url, async (err, db) => {
    if (err) {
      res.json({
        status: '400',
        msg: err,
      })
      return
    }

    console.log(`[mongodb] Connect Success: ${req.params.dbname}`)
    const condition = db.collection('condition')
    const rawdata = db.collection('rawdata')
    const dfs = db.collection('dfs')
    const rms = db.collection('rms')

    const conditionInfo = await dbLib.getConditionData(condition)

    Promise.all([
      dbLib.getRawdataRecord(rawdata, conditionInfo.count),
      dbLib.getRawdataRecord(dfs, conditionInfo.count),
      dbLib.getRawdataRecord(rms, conditionInfo.count),
    ]).then(([rawdata, dfs, rms]) => {
      // Success, reurn results.
      res.json({
        status: '200',
        msg: 'Success',
        data: {
          count: conditionInfo.count,
          length: {
            dfs: dfs.length,
            rawdata: rawdata.length,
            rms: rms.length,
          },
          rms,
          dfs,
          rawdata,
        },
      })

      db.close()
    })
  })
})

module.exports = router
