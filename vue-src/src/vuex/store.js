import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
// modules
import live from './modules/live'
import calendar from './modules/calendar'
import report from './modules/report'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sitename: null,
    // dblist
    dblist: [],
  },
  mutations: {
    DBLIST(state, dblist) {
      state.dblist = dblist
    },
  },
  actions: {
    RESETDATA({ dispatch, commit, state }, path) {
      state.sitename = null

      if (path === '/live' || path === 'all') {
        dispatch('LIVE_RESETDATA')
      }

      if (path === '/report' || path === 'all') {
        dispatch('REPORT_RESETDATA')
      }
    },
  },
  modules: {
    live,
    calendar,
    report,
  },
})
