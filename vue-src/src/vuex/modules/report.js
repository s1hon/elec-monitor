const state = {
  msg: null,
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
    if (rootState.calendar.xhr) {
      rootState.calendar.xhr.abort()
    }

    // calendar
    rootState.calendar.items.fromDate.value = null
    rootState.calendar.items.toDate.value = null

    // history
    state.msg = ''
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
