import Vue from 'vue'
import VueRouter from 'vue-router'

// Router used vue
import context from '../context.vue'
import realtimestream from '../components/RealtimeStream.vue'
import report from '../components/Report.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: context,
      children: [
        {
          path: '',
          redirect: 'live',
        },
        {
          path: 'live',
          component: realtimestream,
        },
        {
          path: 'history',
          component: report,
        },
      ],
    },
    // { path: '/bar', component: Bar },
  ],
})
