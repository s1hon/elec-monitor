const express = require('express')
const MongoClient = require('mongodb').MongoClient
const dbLib = require('../../mongodbLib')
const apiLib = require('./v1Lib')

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
    res.status(400).json({
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
  apiLib.CHECKDBEXIST(req, res)

  // If exist, get datas.
  dbLib.connect({ res, req, dbname: req.params.dbname }, async (db) => {
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


/**
 * [Route] Search db with report page
 * @type {String} dbname
 */
router.get('/search/:dbname', async (req, res) => {
  const dbname = req.params.dbname
  const { start, end } = req.query

  // If there are any params undefined.
  if (!(dbname && start && end)) {
    res.status(400).json({
      msg: {
        name: 'Params error',
        message: 'Please input the right params.',
      },
    })
    return
  }

  await apiLib.CHECKDBEXIST(req, res)

  dbLib.connect({ res, req, dbname: req.params.dbname }, async (db) => {
    console.log(`[mongodb] Connect Success: ${req.params.dbname}`)
    // const events = await apiLib.FINDTIMECOUNTID(db, start, end)
    const { raw, startCOUNTID, endCOUNTID } = await apiLib.FINDTIMECOUNTID(db, start, end)
    const events = await apiLib.FINDDATAWITHRANGE(db.collection('event'), startCOUNTID, endCOUNTID)
    const kwhs = await apiLib.FINDDATAWITHRANGE(db.collection('kwh'), start, end)

    const thd = []
    const swellsagV = []
    const kwh = []
    // const count = []
    events.map((obj) => {
      // {
      //   "harmonic": [
      //     60.05859375,
      //     1,
      //     420.41015625,
      //     0.1738153720203931
      //   ],
      //   "swellsag": "non",
      //   "swellsagV": null,
      //   "thd": 17.38153720203931,
      //   "count": 7776
      // },
      thd.push(obj.thd)
      swellsagV.push(obj.swellsagV)
      // count.push(obj.count)
    })
    kwhs.map((obj) => {
      kwh.push(obj.data)
    })
    res.json({
      thd,
      swellsagV,
      raw,
      kwh,
      // count,
      // events,
    })
  })
})


/**
 * [Route] Get dbname time range
 * @type {String} dbname
 */
router.get('/time/:dbname', async (req, res) => {
  await apiLib.CHECKDBEXIST(req, res)
  dbLib.connect({ res, req, dbname: req.params.dbname }, async (db) => {
    console.log(`[mongodb] Connect Success: ${req.params.dbname}`)
    const { begin, end } = await apiLib.FINDTIMERANGE(db)
    res.json({
      begin,
      end,
    })
  })
})

module.exports = router
