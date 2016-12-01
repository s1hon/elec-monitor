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
    this.$store.dispatch('RESETDATA', this.$route.path)
    this.$store.state.sitename = 'site002'
  },
  watch: {
    '$store.state.sitename': function (sitename) {
      this.$store.dispatch('LIVE_REQUEST', sitename)
      clearInterval(this.$store.state.live.timer.sidebar)
      this.$store.state.live.timer.sidebar = setInterval(() => {
        this.$store.dispatch('LIVE_REQUEST', sitename)
      }, 15000)
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.chart {
  padding: 45px 35px 10px 15px;
}
</style>
