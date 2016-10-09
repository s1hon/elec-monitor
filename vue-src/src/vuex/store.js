import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // timestamp
    timestamp: null,
    // dblist
    dblist: [],
    // res
    status: null,
    msg: null,
    // siteinfo
    siteinfo: {},
    // res.data
    sitename: null,
    count: null,
    zc: null,
    rawdata: null,
    sourcerms: null,
    dfs: null,
    rms: null,
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
      state.rawdata = res.data.rawdata
      state.sourcerms = res.data.sourcerms
      state.dfs = res.data.dfs
      state.rms = res.data.rms
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
  },
  getters: {
    fft: (state) => {
      return state.fft
    },
    timestamp: (state) => {
      return state.timestamp
    },
    rawdata: (state) => {
      return state.rawdata
    },
    sourcerms: (state) => {
      return state.sourcerms
    },
    dfs: (state) => {
      return state.dfs
    },
    rms: (state) => {
      return state.rms
    },
    zc: (state) => {
      return state.zc
    },
  },
})
