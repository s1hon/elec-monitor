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
  try {
    const dbs = await dbLib.getdbLists()
    res.json({
      status: '200',
      msg: 'Success',
      data: dbs,
    })
  } catch (e) {
    res.json({
      status: '400',
      msg: e,
    })
  }
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
    const sourcerms = db.collection('sourcerms')
    const dfs = db.collection('dfs')
    const rms = db.collection('rms')
    const zc = db.collection('zc')

    const conditionInfo = await dbLib.getConditionData(condition)

    Promise.all([
      dbLib.getRawdataRecord(condition, conditionInfo.count),
      dbLib.getRawdataRecord(rawdata, conditionInfo.count, 450),
      dbLib.getRawdataRecord(sourcerms, conditionInfo.count, 450),
      dbLib.getRawdataRecord(dfs, conditionInfo.count, 450),
      dbLib.getRawdataRecord(rms, conditionInfo.count, 450),
      dbLib.getRawdataRecord(zc, conditionInfo.count),
    ]).then(([condition, rawdata, sourcerms, dfs, rms, zc]) => {
      // Success, reurn results.
      res.json({
        status: '200',
        msg: 'Success',
        data: {
          sitename: req.params.dbname,
          count: conditionInfo.count,
          zc: zc[0].data,
          condition: condition[0],
          rawdata,
          sourcerms,
          dfs,
          rms,
        },
      })

      db.close()
    })
  })
})

module.exports = router
