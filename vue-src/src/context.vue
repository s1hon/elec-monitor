<template>
  <div class="row chart">
    <chart></chart>
  </div>
</template>

<script>
import chart from './components/Chart.vue'

export default {
  components: {
    chart,
  },
}
</script>

<style lang="scss" scoped>
.chart {
  padding: 45px 35px 10px 15px;
}
</style>
