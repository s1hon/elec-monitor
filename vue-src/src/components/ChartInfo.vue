<template>
  <div>
    <div class="row title">
      <p v-show="!sitename">請選擇要檢視之站點</p>
      <p v-show="sitename">目標: {{sitename}}   ＃{{count}}</p>
    </div>

    <div v-show="sitename">
      <div class="row info-line-1">
        <div class="info col-xl-6">
          <timeclock class="div"></timeclock>
          <scoped1 class="div"></scoped1>
          <scoped2 class="div"></scoped2>
        </div>
        <div class="info col-xl-6">
          <fftChart></fftChart>
          <powerChart></powerChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fftChart from './ChartInfo/fft-graph.vue'
import powerChart from './ChartInfo/power-graph.vue'
import timeclock from './ChartInfo/timeclock.vue'
import scoped1 from './ChartInfo/status-scoped-1.vue'
import scoped2 from './ChartInfo/status-scoped-2.vue'

export default {
  components: {
    fftChart,
    powerChart,
    timeclock,
    scoped1,
    scoped2,
  },
  computed: {
    sitename() {
      return this.$store.state.sitename
    },
    count() {
      return this.$store.state.count
    },
  },
}
</script>

<style lang="scss" scoped>

.title {
  color: #E2E2E2;
  background-color: #5B6378;
  font-size: 2.2vh;
  margin-top: 10px;
  padding: 8px 0 0 20px;
  height: 5vh;
}

.info-line-1 {
  color: #E2E2E2;
  margin-left: 20px;

  @media screen and (max-width: 940px) {
    margin: 0;
  }

  .info {
    float:left;
    div{
      float: left;
    }
  }
}
</style>
