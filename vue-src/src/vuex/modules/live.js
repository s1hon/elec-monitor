import moment from 'moment'

const state = {
  // timer
  timer: {
    sidbar: null,
    chart: null,
  },
  // timestamp
  timestamp: null,
  // res
  status: null,
  msg: null,

  // res.data
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
  // harmonic
  harmonic: null,
  baseband: null,
  harmonics: null,

  // res.data.event
  swellsag: null,
  swellsagV: null,
  thd: null,

  xhr: null,
}

// getters
const getters = {
  // fft: (state) => {
  //   return state.fft
  // },
  live_swellsag: (state) => { // 驟升降
    let swellsagSTRING = ''
    if (state.swellsag) {
      if (state.swellsag.match(/swell/g)) {
        swellsagSTRING += '驟升 '
      }
      if (state.swellsag.match(/sag/g)) {
        swellsagSTRING += '驟降 '
      }
      if (state.swellsag.match(/non/g)) {
        swellsagSTRING = 'N/A'
      }
    }
    return swellsagSTRING
  },
  live_baseband: (state) => {
    return state.baseband
  },
  live_harmonics: (state) => {
    return state.harmonics
  },
  live_thd: (state) => {
    return state.thd
  },
  live_fftgraph: (state) => {
    const halfLength = Math.ceil(state.fft.length / 2)
    const rightSide = state.fft.splice(halfLength, state.fft.length)
    return rightSide
  },
}

// mutations
const mutations = {
  LIVE_REQUEST(state, res) {
    // res
    state.status = res.status
    state.msg = res.msg
    // res.data
    // state.sitename = res.data.sitename
    state.count = res.data.count
    state.zc = res.data.zc.toFixed(2)
    state.powersignal = res.data.powersignal
    state.powersignalRMS = res.data.powersignalRMS
    state.powersignalAVG = res.data.powersignalAVG
    state.fundamental = res.data.fundamental
    state.fundamentalRMS = res.data.fundamentalRMS
    state.fundamentalAVG = res.data.fundamentalAVG
    state.power = res.data.power
    state.powerRMS = res.data.powerRMS
    state.powerAVG = res.data.powerAVG
    state.fft = res.data.fft
    // res.data.condition
    state.day = moment(res.data.condition.time).format('YYYY/MM/DD')
    state.time = moment(res.data.condition.time).format('HH:mm:ss')
    state.temp = res.data.condition.temp
    state.hum = res.data.condition.hum
    state.lon = res.data.condition.lon
    state.lat = res.data.condition.lat
    state.timestamp = Date.now()
    // res.data.event
    state.swellsag = res.data.swellsag // 驟升降
    if (res.data.swellsagV !== 0) {
      state.swellsagV = res.data.swellsagV.toFixed(2) // 驟升降
    } else {
      state.swellsagV = res.data.swellsagV // 驟升降
    }

    // state.harmonic Function
    state.harmonic = res.data.harmonic // 基頻, 諧波
    const [baseband,, ...harmonics] = state.harmonic

    let harmonicTMP = []
    const harmonic = []

    for (let i = 0; i < harmonics.length; i += 1) {
      harmonicTMP.push(harmonics[i])
      if (i % 2 === 1 && i > 0) {
        harmonic.push(`( ${harmonicTMP[0].toFixed(2)}, ${(harmonicTMP[1].toFixed(2) * 100).toFixed(2)}% )`)
        harmonicTMP = []
      }
    }
    state.baseband = baseband.toFixed(2)
    state.harmonics = harmonic

    state.thd = res.data.thd.toFixed(2)
  },
}

// actions
const actions = {
  LIVE_REQUEST({ commit, state, rootState }, sitename) {
    if (sitename) {
      state.xhr = new XMLHttpRequest()
      const self = this
      state.xhr.open('GET', `/api/v1/info/${sitename}`)
      state.xhr.onload = () => {
        const res = JSON.parse(state.xhr.responseText)
        commit('LIVE_REQUEST', res)
        rootState.sitename = res.data.sitename
      }
      state.xhr.send()
    }
  },
  LIVE_RESETDATA({ commit, state, rootState }) {
    clearInterval(state.timer.chart)
    clearInterval(state.timer.sidebar)

    // timestamp
    state.timestamp = null

    // res
    state.status = null
    state.msg = null

    // res.data
    state.count = null
    state.zc = null
    state.powersignal = null
    state.powersignalRMS = null
    state.powersignalAVG = null
    state.fundamental = null
    state.fundamentalRMS = null
    state.fundamentalAVG = null
    state.power = null
    state.powerRMS = null
    state.powerAVG = null
    state.fft = null

    // res.data.condition
    state.day = null
    state.time = null
    state.temp = null
    state.hum = null
    state.lon = null
    state.lat = null

    // res.data.event
    state.harmonic = null
    state.harmonics = null
    state.baseband = null
    state.swellsag = null
    state.swellsagV = null
    state.thd = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
