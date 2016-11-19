import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    live: {
      // timer
      timer: {
        sidbar: null,
        chart: null,
      },
      // timestamp
      timestamp: null,
      // dblist
      dblist: [],
      // res
      status: null,
      msg: null,

      // res.data
      sitename: null,
      count: null,
      zc: null,
      powersignal: null,
      powersignalRMS: null,
      powersignalAVG: null,
      fundamental: null,
      fundamentalRMS: null,
      fundamentalAVG: null,
      power: null,
      powerRMS: null,
      powerAVG: null,
      fft: null,

      // res.data.condition
      day: null,
      time: null,
      temp: null,
      hum: null,
      lon: null,
      lat: null,

      // res.data.event
      harmonic: null,
      swellsag: null,
      swellsagV: null,
      thd: null,
    },

    // calendar
    calendar: {
      show: false,
      x: 0,
      y: 0,
      picker: '',
      type: 'date',
      value: '',
      begin: '',
      end: '',
      sep: '/',
      weeks: [],
      months: [],
      range: false,
      items: {
        fromDate: {
          type: 'datetime',
          value: '',
          sep: '-',
        },
        toDate: {
          type: 'datetime',
          value: '',
          sep: '-',
        },
      },
    },

  },
  mutations: {
    DBLIST(state, dblist) {
      state.live.dblist = dblist
    },
    REQUEST(state, playload) {
      const res = playload.res

      if (playload.path === '/live') {
        // res
        state.live.status = res.status
        state.live.msg = res.msg
        // res.data
        state.live.sitename = res.data.sitename
        state.live.count = res.data.count
        state.live.zc = res.data.zc.toFixed(2)
        state.live.powersignal = res.data.powersignal
        state.live.powersignalRMS = res.data.powersignalRMS
        state.live.powersignalAVG = res.data.powersignalAVG
        state.live.fundamental = res.data.fundamental
        state.live.fundamentalRMS = res.data.fundamentalRMS
        state.live.fundamentalAVG = res.data.fundamentalAVG
        state.live.power = res.data.power
        state.live.powerRMS = res.data.powerRMS
        state.live.powerAVG = res.data.powerAVG
        state.live.fft = res.data.fft
        // res.data.condition
        state.live.day = moment(res.data.condition.time).format('YYYY/MM/DD')
        state.live.time = moment(res.data.condition.time).format('HH:mm:ss')
        state.live.temp = res.data.condition.temp
        state.live.hum = res.data.condition.hum
        state.live.lon = res.data.condition.lon
        state.live.lat = res.data.condition.lat
        state.live.timestamp = Date.now()
        // res.data.event
        state.live.swellsag = res.data.swellsag // 驟升降
        if (res.data.swellsagV !== 0) {
          state.live.swellsagV = res.data.swellsagV.toFixed(2) // 驟升降
        } else {
          state.live.swellsagV = res.data.swellsagV // 驟升降
        }
        state.live.harmonic = res.data.harmonic // 基頻, 諧波
        state.live.thd = res.data.thd
      }
    },
    RESETDATA(state) {
      clearInterval(state.live.timer.chart)
      clearInterval(state.live.timer.sidebar)

      // timestamp
      state.live.timestamp = null

      // res
      state.live.status = null
      state.live.msg = null

      // res.data
      state.live.sitename = null
      state.live.count = null
      state.live.zc = null
      state.live.powersignal = null
      state.live.powersignalRMS = null
      state.live.powersignalAVG = null
      state.live.fundamental = null
      state.live.fundamentalRMS = null
      state.live.fundamentalAVG = null
      state.live.power = null
      state.live.powerRMS = null
      state.live.powerAVG = null
      state.live.fft = null

      // res.data.condition
      state.live.day = null
      state.live.time = null
      state.live.temp = null
      state.live.hum = null
      state.live.lon = null
      state.live.lat = null

      // res.data.event
      state.live.harmonic = null
      state.live.swellsag = null
      state.live.swellsagV = null
      state.live.thd = null
    },
  },
  getters: {
    // fft: (state) => {
    //   return state.live.fft
    // },
    swellsag: (state) => { // 驟升降
      let swellsagSTRING = ''
      if (state.live.swellsag) {
        if (state.live.swellsag.match(/swell/g)) {
          swellsagSTRING += '驟升 '
        }
        if (state.live.swellsag.match(/sag/g)) {
          swellsagSTRING += '驟降 '
        }
        if (state.live.swellsag.match(/non/g)) {
          swellsagSTRING = 'N/A'
        }
      }
      return swellsagSTRING
    },
    harmonic: (state) => { // 基頻, 諧波
      if (state.live.harmonic) {
        const [baseband,, ...harmonics] = state.live.harmonic

        let harmonicTMP = []
        const harmonic = []

        for (let i = 0; i < harmonics.length; i += 1) {
          harmonicTMP.push(harmonics[i])
          if (i % 2 === 1 && i > 0) {
            harmonic.push(`( ${harmonicTMP[0].toFixed(2)}, ${(harmonicTMP[1].toFixed(2) * 100).toFixed(2)}% )`)
            harmonicTMP = []
          }
        }

        return {
          baseband: baseband.toFixed(2),
          harmonic,
        }
      }
      return null
    },
    thd: (state) => {
      return state.live.thd.toFixed(2)
    },
    fftgraph: (state) => {
      const halfLength = Math.ceil(state.live.fft.length / 2)
      const rightSide = state.live.fft.splice(halfLength, state.live.fft.length)
      return rightSide
    },
  },
})
