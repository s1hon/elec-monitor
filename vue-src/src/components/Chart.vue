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
    timer: null,
    // EChart.js
    chart: null,
    // Datas
    rawdata: () => {
      return this.nullArray(200)
    },
    sourcerms: () => {
      return this.nullArray(200)
    },
    dfs: () => {
      return this.nullArray(200)
    },
    rms: () => {
      return this.nullArray(200)
    },
  }),
  mounted() {
    this.$store.watch(() => this.$store.getters.timestamp, this.drawdbchart)

    const ctx = document.getElementById('myChart')
    this.chart = echarts.init(ctx)
    this.InitVars()
    this.SetChartOption()
  },
  methods: {
    // Echart.js
    fixChromeCrash() {
      // Dispose chart to fix crash
      this.chart.dispose()
      this.chart = echarts.init(document.getElementById('myChart'))
      this.SetChartOption()
    },
    SetChartOption() {
      this.chart.setOption({
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
          data: ['rawdata', 'rawdata-rms', 'dfs', 'dfs-rms'],
          textStyle: {
            color: '#E2E2E2',
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
          name: 'rawdata',
          itemStyle: { normal: { color: '#55AFD6' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.rawdata,
        },
        {
          name: 'rawdata-rms',
          itemStyle: { normal: { color: '#FFF55B' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.sourcerms,
        },
        {
          name: 'dfs',
          itemStyle: { normal: { color: '#FB6A72' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.dfs,
        },
        {
          name: 'dfs-rms',
          itemStyle: { normal: { color: '#87D655' } },
          showSymbol: false,
          type: 'line',
          hoverAnimation: false,
          legendHoverLink: false,
          data: this.rms,
        }],
      })
    },
    InitVars() {
      this.rawdata = this.nullArray(200)
      this.sourcerms = this.nullArray(200)
      this.dfs = this.nullArray(200)
      this.rms = this.nullArray(200)
    },
    // ChartDraw
    drawdbchart() {
      // Reset Chart
      this.dberr = 0
      clearInterval(this.timer)

      if (this.$store.state.status === '400') {
        this.dberr = JSON.stringify(this.$store.state.msg, 0, 2)
        return
      }

      // Init Vars
      this.InitVars()

      this.chart.setOption({
        series: [{
          name: 'rawdata',
          data: this.rawdata,
        },
        {
          name: 'rawdata-rms',
          data: this.sourcerms,
        },
        {
          name: 'dfs',
          data: this.dfs,
        },
        {
          name: 'dfs-rms',
          data: this.rms,
        }],
      })

      const rawdata = this.$store.getters.rawdata
      const sourcerms = this.$store.getters.sourcerms
      const dfs = this.$store.getters.dfs
      const rms = this.$store.getters.rms
      const zc = this.$store.getters.zc

      this.timer = setInterval(() => {
        this.pushDataToChart([
          {
            name: 'rawdata',
            value: rawdata[0] ? rawdata[0] : 0,
          },
          {
            name: 'sourcerms',
            value: sourcerms[0] ? sourcerms[0] : 0,
          },
          {
            name: 'dfs',
            value: dfs[0] ? dfs[0] : 0,
          },
          {
            name: 'rms',
            value: rms[0] ? rms[0] : 0,
          },
        ])
        rawdata.splice(0, 1)
        sourcerms.splice(0, 1)
        dfs.splice(0, 1)
        rms.splice(0, 1)
      }, 20)
      // this.dberr = JSON.stringify(res.data)
    },
    nullArray: num => Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0),
    pushDataToChart(array) {
      array.map(({ name, value }) => {
        if (name === 'rawdata') {
          this.rawdata.splice(0, 1)
          this.rawdata.push(value.data)
        }

        if (name === 'sourcerms') {
          this.sourcerms.splice(0, 1)
          this.sourcerms.push(value.data)
        }

        if (name === 'dfs') {
          this.dfs.splice(0, 1)
          this.dfs.push(value.data)
        }

        if (name === 'rms') {
          this.rms.splice(0, 1)
          this.rms.push(value.data)
        }
      })
      this.chart.setOption({
        series: [{
          name: 'rawdata',
          data: this.rawdata,
        },
        {
          name: 'rawdata-rms',
          data: this.sourcerms,
        },
        {
          name: 'dfs',
          data: this.dfs,
        },
        {
          name: 'dfs-rms',
          data: this.rms,
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
