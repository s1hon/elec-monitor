<template>
  <div>
    <p class="err-msg" v-show="dberr">{{ dberr }}</p>
    <div id="myChart" class="realtimegraph col-xl-12" v-show="!dberr"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data: () => ({
    dberr: null,
    // EChart.js
    chart: null,
    // Datas
    powersignal: () => {
      return this.nullArray(200)
    },
    powersignalRMS: () => {
      return this.nullArray(200)
    },
    fundamental: () => {
      return this.nullArray(200)
    },
    fundamentalRMS: () => {
      return this.nullArray(200)
    },
    watch1: null,
    watch2: null,
  }),
  mounted() {
    this.watch1 = this.$store.watch(() => this.$store.state.live.timestamp, this.CHECKONLIVEROUTE)
    this.watch2 = this.$store.watch(() => this.$route, this.RESET)

    const ctx = document.getElementById('myChart')
    this.chart = echarts.init(ctx)
    this.InitVars()
    this.SetChartOption()
  },
  beforeDestroy() {
    this.watch1()
    this.watch2()
  },
  methods: {
    CHECKONLIVEROUTE() {
      if (this.$route.path === '/live' && this.$store.state.live.sitename) {
        this.drawdbchart()
      }
    },
    RESET() {
      this.chart.dispose()
      this.InitVars()
    },
    // Echart.js
    fixChromeCrash() {
      // Dispose chart to fix crash
      this.chart.dispose()
      this.chart = echarts.init(document.getElementById('myChart'))
      this.SetChartOption()
    },
    SetChartOption() {
      this.chart.setOption({
        progressive: 100,
        hoverLayerThreshold: 10,
        animation: false,
        grid: {
          borderColor: '#E2E2E2',
          left: 50,
          right: 0,
          top: 20,
          bottom: 60,
        },
        legend: {
          bottom: 10,
          data: ['Power Signal', 'Power Signal (rms)', 'Fundamental', 'Fundamental (rms)'],
          textStyle: {
            color: '#E2E2E2',
            fontSize: 18,
          },
        },
        xAxis: {
          data: this.nullArray(200),
          axisLine: {
            lineStyle: {
              color: '#E2E2E2',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          max: 200,
          min: -200,
          axisLine: {
            lineStyle: {
              color: '#E2E2E2',
            },
          },
        },
        series: [{
          name: 'Power Signal',
          itemStyle: { normal: { color: '#55AFD6' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.powersignal,
        },
        {
          name: 'Power Signal (rms)',
          itemStyle: { normal: { color: '#FFF55B' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.powersignalRMS,
        },
        {
          name: 'Fundamental',
          itemStyle: { normal: { color: '#FB6A72' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.fundamental,
        },
        {
          name: 'Fundamental (rms)',
          itemStyle: { normal: { color: '#87D655' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.fundamentalRMS,
        }],
      })
    },
    InitVars() {
      this.powersignal = this.nullArray(200)
      this.powersignalRMS = this.nullArray(200)
      this.fundamental = this.nullArray(200)
      this.fundamentalRMS = this.nullArray(200)
    },
    // ChartDraw
    drawdbchart() {
      // Reset Chart
      this.dberr = 0
      clearInterval(this.$store.state.live.timer.chart)

      if (this.$store.state.live.status === '400') {
        this.dberr = JSON.stringify(this.$store.state.live.msg, 0, 2)
        return
      }

      // Init Vars
      this.InitVars()

      this.chart.setOption({
        series: [{
          name: 'Power Signal',
          data: this.powersignal,
        },
        {
          name: 'Power Signal (rms)',
          data: this.powersignalRMS,
        },
        {
          name: 'Fundamental',
          data: this.fundamental,
        },
        {
          name: 'Fundamental (rms)',
          data: this.fundamentalRMS,
        }],
      })

      const powersignal = this.$store.state.live.powersignal
      const powersignalRMS = this.$store.state.live.powersignalRMS
      const fundamental = this.$store.state.live.fundamental
      const fundamentalRMS = this.$store.state.live.fundamentalRMS
      const zc = this.$store.state.live.zc

      this.$store.state.live.timer.chart = setInterval(() => {
        this.pushDataToChart([
          {
            name: 'Power Signal',
            value: powersignal[0] ? powersignal[0] : 0,
          },
          {
            name: 'Power Signal (rms)',
            value: powersignalRMS[0] ? powersignalRMS[0] : 0,
          },
          {
            name: 'Fundamental',
            value: fundamental[0] ? fundamental[0] : 0,
          },
          {
            name: 'FUndamental (rms)',
            value: fundamentalRMS[0] ? fundamentalRMS[0] : 0,
          },
        ])
        powersignal.splice(0, 1)
        powersignalRMS.splice(0, 1)
        fundamental.splice(0, 1)
        fundamentalRMS.splice(0, 1)
      }, 20)
      // this.dberr = JSON.stringify(res.data)
    },
    nullArray: num => Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0),
    pushDataToChart(array) {
      array.map(({ name, value }) => {
        if (name === 'Power Signal') {
          this.powersignal.splice(0, 1)
          this.powersignal.push(value.data)
        }

        if (name === 'Power Signal (rms)') {
          this.powersignalRMS.splice(0, 1)
          this.powersignalRMS.push(value.data)
        }

        if (name === 'Fundamental') {
          this.fundamental.splice(0, 1)
          this.fundamental.push(value.data)
        }

        if (name === 'FUndamental (rms)') {
          this.fundamentalRMS.splice(0, 1)
          this.fundamentalRMS.push(value.data)
        }
      })
      this.chart.setOption({
        series: [{
          name: 'Power Signal',
          data: this.powersignal,
        },
        {
          name: 'Power Signal (rms)',
          data: this.powersignalRMS,
        },
        {
          name: 'Fundamental',
          data: this.fundamental,
        },
        {
          name: 'Fundamental (rms)',
          data: this.fundamentalRMS,
        }],
      })
    },
  },
}
</script>

<style lang="scss" scoped>

.realtimegraph {
  // margin-top: 15px;
  // margin-bottom: 30px;
  height: 40vh;
}

.err-msg {
  color: white;
}
</style>
