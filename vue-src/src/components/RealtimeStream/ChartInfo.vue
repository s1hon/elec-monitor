<template>
  <div>
    <div class="row title">
      <p v-show="!sitename">請選擇要檢視之站點</p>
      <p v-show="sitename">目標: {{sitename}}   ＃{{count}}</p>
    </div>

    <div v-show="sitename">
      <div class="row info-line-1">
        <div class="info col-xl-8">
          <div class="info brk">
            <timeclock class="status"></timeclock>
            <scoped1 class="status"></scoped1>
          </div>
          <div class="info">
            <scoped3 class="status"></scoped3>
            <scoped2 class="status"></scoped2>
          </div>
        </div>
        <div class="info col-xl-4">
          <fftChart></fftChart>
          <powerChart></powerChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fftChart from './modules/fft-graph.vue'
import powerChart from './modules/power-graph.vue'
import timeclock from './modules/timeclock.vue'
import scoped1 from './modules/status-scoped-1.vue'
import scoped2 from './modules/status-scoped-2.vue'
import scoped3 from './modules/status-scoped-3.vue'

export default {
  components: {
    fftChart,
    powerChart,
    timeclock,
    scoped1,
    scoped2,
    scoped3,
  },
  computed: {
    sitename() {
      return this.$store.state.sitename
    },
    count() {
      return this.$store.state.live.count
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
    margin-top: 20px;
  }

  .brk {
    margin-top: -15px;
    width: 310px;
    @media screen and (max-width: 940px) {
      width: auto;
    }
  }

  .status {
    float: left;
    min-height: 100px;
    min-width: 300px;
    margin-top: 10px;
    margin-right: 30px;
  }
}
</style>
