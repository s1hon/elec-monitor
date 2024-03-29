import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
// modules
import live from './modules/live'
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
    SITENAME(state, sitename) {
      state.sitename = sitename
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
    report,
  },
})
