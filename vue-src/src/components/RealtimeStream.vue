<template>
  <div>
    <div class="row chart">
      <chart ref="chart"></chart>
    </div>
    <info ref="info"></info>
  </div>
</template>

<script>
import chart from './RealtimeStream/Chart.vue'
import info from './RealtimeStream/ChartInfo.vue'

export default {
  components: {
    chart,
    info,
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('RESETDATA')
    this.$store.state.live.sitename = 'site002'
  },
  watch: {
    '$store.state.live.sitename': function (sitename) {
      this.request(sitename)
      clearInterval(this.$store.state.live.timer.sidebar)
      this.$store.state.live.timer.sidebar = setInterval(() => {
        this.request(sitename)
      }, 15000)
    },
  },
  methods: {
    request(sitename) {
      const xhr = new XMLHttpRequest()
      const self = this
      xhr.open('GET', `/api/v1/info/${sitename}`)
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        this.$store.commit('REQUEST', { path: this.$route.path, res })
      }
      xhr.send()
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  padding: 45px 35px 10px 15px;
}
</style>
