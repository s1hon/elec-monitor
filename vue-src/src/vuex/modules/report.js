import moment from 'moment'

const state = {
  timestamp: null,
  msg: null,
  thd: {
    type: 'bar',
    title: 'thd',
    rawdata: [],
    xhr: null,
  },
  swellsagV: {
    type: 'bar',
    title: 'swellsagV',
    rawdata: [],
    xhr: null,
    min: 'dataMin',
    max: 'dataMax',
  },

  // CALENDAR
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
    xhr: null,
  },
}

// getters
const getters = {

}

// mutations
const mutations = {

}

// actions
const actions = {
  REPORT_RESETDATA({ commit, state, rootState }) {
    if (state.calendar.xhr) {
      state.calendar.xhr.abort()
    }

    // calendar
    state.calendar.items.fromDate.value = null
    state.calendar.items.toDate.value = null

    // history
    state.msg = ''
  },
  CALENDAR_REQUEST({ commit, state, rootState }, { start, end }) {
    // 2016/11/08 05:00:38
    state.msg = `Searching...${moment(start).format()}~${moment(end).format()}`
    if (state.xhr) {
      state.xhr.abort()
    }
    state.xhr = new XMLHttpRequest()
    const self = this
    state.xhr.open('GET', `/api/v1/search/${rootState.sitename}?g=harmonic,thd&start=${start}&end=${end}`)
    state.xhr.onload = () => {
      const res = JSON.parse(state.xhr.responseText)
      state.msg = ''
      // commit('REQUEST', { path: this.$route.path, res })
      // state.msg = res

      // PUT DATA TO VARS
      state.thd.rawdata = res.thd
      state.swellsagV.rawdata = res.swellsagV


      state.timestamp = Date.now()
    }
    state.xhr.send()
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
