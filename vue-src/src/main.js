// Import module
import Vue from 'vue'

// Import Script
import App from './App.vue'
import store from './vuex/store'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
