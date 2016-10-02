<template>
  <div class="row chart">
    <chart></chart>
  </div>
  <info></info>
</template>

<script>
import chart from './components/Chart.vue'
import info from './components/ChartInfo.vue'

export default {
  components: {
    chart,
    info,
  },
}
</script>

<style lang="scss" scoped>
.chart {
  padding: 45px 35px 10px 15px;
}
</style>
