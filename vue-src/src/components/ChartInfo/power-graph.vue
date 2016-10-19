<template>
  <div class="row">
    power
    <div id="power" class="realtimegraph"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data: () => ({
    // Chart Setting
    chart: null,
    // Datas
    power: null,
  }),
  mounted() {
    const ctx = document.getElementById('power')
    this.chart = echarts.init(ctx)

    // Init Vars
    this.power = this.nullArray(200)

    // Draw Chart
    this.chart.setOption({
      hoverLayerThreshold: 10,
      // animation: false,
      grid: {
        show: true,
        borderColor: '#5B6378',
        left: 0,
        right: 120,
        top: 0,
        bottom: 30,
      },
      // legend: {
      //   bottom: 20,
      //   data: ['power'],
      //   textStyle: {
      //     color: '#5B6378',
      //   },
      // },
      xAxis: {
        data: this.nullArray(200),
        axisLine: {
          lineStyle: {
            color: '#5B6378',
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
        axisLine: {
          lineStyle: {
            color: '#5B6378',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#5B6378',
          },
        },
      },
      series: [{
        name: 'power',
        itemStyle: { normal: { color: '#9FA5B3' } },
        showSymbol: false,
        type: 'line',
        data: this.nullArray(200),
      }],
    })

    this.$store.watch(() => this.$store.getters.timestamp, this.getchartinfo)
  },
  methods: {
    getchartinfo() {
      this.pushpower(this.$store.getters.power)
    },
    nullArray(num) {
      return Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0)
    },
    pushpower(power) {
      const label = []
      const data = []
      power.map((obj) => {
        data.push(obj.data)
        label.push()
      })

      this.chart.setOption({
        series: [{
          name: 'power',
          data,
        }],
      })
      // this.chartDataSetting.datasets[0].labels = this.nullArray(data.length)
      // this.chartDataSetting.datasets[0].data = data
      // this.myLineChart.update()
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  padding: 25px 0 0 0;
}


.realtimegraph {
  // margin-top: 15px;
  // margin-bottom: 30px;
  height: 12vh;
  width: 30vw;
}

</style>
