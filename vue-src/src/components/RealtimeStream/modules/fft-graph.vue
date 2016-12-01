<template>
  <div class="row">
    FFT
    <div id="fft" class="realtimegraph"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data: () => ({
    // Chart Setting
    chart: null,
    // Datas
    fft: null,
    watch: null,
  }),
  mounted() {
    const ctx = document.getElementById('fft')
    this.chart = echarts.init(ctx)

    // Init Vars
    this.fft = this.nullArray(200)

    // Draw Chart
    this.chart.setOption({
      hoverLayerThreshold: 10,
      // animation: false,
      grid: {
        show: true,
        borderColor: '#5B6378',
        left: 30,
        right: 15,
        top: 10,
        bottom: 20,
      },
      // legend: {
      //   bottom: 20,
      //   data: ['fft'],
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
          show: true,
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
        name: 'fft',
        itemStyle: { normal: { color: '#9FA5B3' } },
        showSymbol: false,
        type: 'line',
        data: this.nullArray(200),
      }],
    })

    this.watch = this.$store.watch(() => this.$store.state.live.timestamp, this.getchartinfo)
  },
  beforeDestroy() {
    this.watch()
  },
  methods: {
    getchartinfo() {
      this.pushfft(this.$store.getters.live_fftgraph)
    },
    nullArray(num) {
      return Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0)
    },
    fftLabelArray(data) {
      const arraySite = new Array(128)
      arraySite[0] = 0
      for (let i = 0; i <= 1500; i += 300) {
        arraySite[((data.length / 1500) * i).toFixed(0) - 1] = i
      }
      return arraySite
    },
    pushfft(fft) {
      const data = []
      fft.map((obj) => {
        data.push(obj.data)
      })

      this.chart.setOption({
        series: [{
          name: 'fft',
          data,
        }],
        xAxis: {
          data: this.fftLabelArray(data),
          axisLabel: {
            show: true,
            interval: 0,
          },
        },
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
  padding: 25px 0 0px 0;
}


.realtimegraph {
  // margin-top: 15px;
  // margin-bottom: 30px;
  height: 13vh;
  width: 290px;
  @media screen and (max-width: 1200px) {
    width: 90vw;
  }
}
</style>
