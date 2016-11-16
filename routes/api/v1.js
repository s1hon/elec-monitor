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
 * [Route] Get powersignal, fundamental... datas
 * @type {String} dbname
 */
router.get('/info/:dbname', async (req, res) => {
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
    const powersignal = db.collection('powersignal')
    const powersignalRMS = db.collection('powersignalRMS')
    const fundamental = db.collection('fundamental')
    const fundamentalRMS = db.collection('fundamentalRMS')
    const power = db.collection('power')
    const powerRMS = db.collection('powerRMS')
    const fft = db.collection('fft')
    const zc = db.collection('zc')
    const events = db.collection('event')

    const conditionInfo = await dbLib.getConditionData(condition)

    Promise.all([
      dbLib.getRawdataRecord(condition, conditionInfo.count),
      dbLib.getRawdataRecord(powersignal, conditionInfo.count, 450),
      dbLib.getRawdataRecord(powersignalRMS, conditionInfo.count, 450),
      dbLib.getRawdataRecord(fundamental, conditionInfo.count, 450),
      dbLib.getRawdataRecord(fundamentalRMS, conditionInfo.count, 450),
      dbLib.getRawdataRecord(power, conditionInfo.count, 450),
      dbLib.getRawdataRecord(powerRMS, conditionInfo.count, 450),
      dbLib.getRawdataRecord(fft, conditionInfo.count),
      dbLib.getRawdataRecord(zc, conditionInfo.count),
      dbLib.getRawdataRecord(events, conditionInfo.count),
    ]).then(([
        condition,
        powersignal, powersignalRMS,
        fundamental, fundamentalRMS,
        power, powerRMS,
        fft, zc,
        events,
    ]) => {
      // Continue get Average with [powersignal, fundamental, power]
      Promise.all([
        dbLib.getAverage(powersignalRMS),
        dbLib.getAverage(fundamentalRMS),
        dbLib.getAverage(powerRMS),
      ]).then(([
        powersignalAVG,
        fundamentalAVG,
        powerAVG,
      ]) => {
        // Success, reurn results.
        res.json({
          status: '200',
          msg: 'Success',
          data: {
            sitename: req.params.dbname,
            count: conditionInfo.count,
            zc: zc[0].data,
            condition: condition[0],
            powersignal,
            powersignalRMS,
            powersignalAVG,
            fundamental,
            fundamentalRMS,
            fundamentalAVG,
            power,
            powerRMS,
            powerAVG,
            fft,
            // events,
            harmonic: events[0].harmonic,
            swellsag: events[0].swellsag,
            swellsagV: events[0].swellsagV,
            thd: events[0].thd,
          },
        })

        db.close()
      })
    })
  })
})

router.get('/search/:dbname', async (req, res) => {
  res.json({
    // ${req.params.dbname}
    // req.query => get
    query: req.query,
  })
})

module.exports = router
