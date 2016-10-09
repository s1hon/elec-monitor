import Vue from 'vue'
import VueRouter from 'vue-router'

// Router used vue
import context from '../context.vue'
import realtimestream from '../components/RealtimeStream.vue'
import chart from '../components/Chart.vue'
import hello from '../components/Hello.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: context,
      children: [
        {
          path: '',
          alias: 'live',
          component: realtimestream,
          force: true,
        },
        {
          path: 'history',
          component: hello,
        },
      ],
    },
    // { path: '/bar', component: Bar },
  ],
})
