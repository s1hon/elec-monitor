<template>
  <div id="app" class="container-fluid">
    <Banner></Banner>
    <Chart></Chart>
  </div>
</template>

<script>
import Chart from './components/Chart'
import Banner from './components/Banner'

export default {
  components: {
    Banner,
    Chart,
  },
  events: {
    drawdbChart(res) {
      this.$broadcast('drawdbChart', res)
    },
  },
}
</script>

<style lang="scss">

body {
  height: 100vh;
  background: #605F5E;
}

</style>
