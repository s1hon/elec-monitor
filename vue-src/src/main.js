// Import module
import Vue from 'vue'

// Import Script
import App from './App.vue'
import store from './vuex/store'
import router from './router/main'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
