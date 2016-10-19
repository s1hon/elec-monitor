import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    fundamental: null,
    fundamentalRMS: null,
    fft: null,
    // res.data.condition
    day: null,
    time: null,
    temp: null,
    hum: null,
    lon: null,
    lat: null,
  },
  mutations: {
    DBLIST(state, dblist) {
      state.dblist = dblist
    },
    SITEDATA(state, res) {
      // res
      state.status = res.status
      state.msg = res.msg
      // res.data
      state.sitename = res.data.sitename
      state.count = res.data.count
      state.zc = res.data.zc
      state.powersignal = res.data.rawdata
      state.powersignalRMS = res.data.sourcerms
      state.fundamental = res.data.dfs
      state.fundamentalRMS = res.data.rms
      state.fft = res.data.fft
      // res.data.condition
      state.day = moment(res.data.condition.time).format('YYYY/MM/DD')
      state.time = moment(res.data.condition.time).format('HH:mm:ss')
      state.temp = res.data.condition.temp
      state.hum = res.data.condition.hum
      state.lon = res.data.condition.lon
      state.lat = res.data.condition.lat
      state.timestamp = Date.now()
    },
    RESETDATA(state) {
      clearInterval(state.timer.chart)
      clearInterval(state.timer.sidebar)

      // timestamp
      state.timestamp = null
      // res
      state.status = null
      state.msg = null
      // res.data
      state.sitename = null
      state.count = null
      state.zc = null
      // state.powersignal = null
      // state.powersignalRMS = null
      // state.fundamental = null
      // state.rms = null
      // state.fft = null
      // res.data.condition
      state.day = null
      state.time = null
      state.temp = null
      state.hum = null
      state.lon = null
      state.lat = null
    },
  },
  getters: {
    fft: (state) => {
      return state.fft
    },
    timestamp: (state) => {
      return state.timestamp
    },
    powersignal: (state) => {
      return state.powersignal
    },
    powersignalRMS: (state) => {
      return state.powersignalRMS
    },
    fundamental: (state) => {
      return state.fundamental
    },
    fundamentalRMS: (state) => {
      return state.fundamentalRMS
    },
    zc: (state) => {
      return state.zc
    },
  },
})
