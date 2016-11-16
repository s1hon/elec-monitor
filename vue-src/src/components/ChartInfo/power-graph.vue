<template>
  <div class="row">
    Power-RMS
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
        right: 0,
        top: 0,
        bottom: 0,
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
      // #9FA5B3
      series: [
        {
          name: 'power',
          itemStyle: {
            normal: {
              color: '#4D5363',
            },
          },
          showSymbol: false,
          type: 'line',
          areaStyle: {
            normal: {
              color: '#4D5363',
            },
          },
          data: this.nullArray(200),
        },
        {
          name: 'powerrms',
          itemStyle: {
            normal: {
              color: '#9FA5B3',
            },
          },
          showSymbol: false,
          type: 'line',
          data: this.nullArray(200),
        },
      ],
    })

    this.$store.watch(() => this.$store.state.timestamp, this.getchartinfo)
  },
  methods: {
    getchartinfo() {
      this.pushData(this.$store.state.power, 'power')
      this.pushData(this.$store.state.powerRMS, 'powerrms')
    },
    nullArray(num) {
      return Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0)
    },
    pushData(power, chartname) {
      const label = []
      const data = []
      power.map((obj) => {
        data.push(obj.data)
        label.push()
      })

      this.chart.setOption({
        series: [{
          name: chartname,
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
  padding: 25px 0 30px 0;
}


.realtimegraph {
  // margin-top: 15px;
  // margin-bottom: 30px;
  height: 12vh;
  width: 290px;
  @media screen and (max-width: 1200px) {
    width: 90vw;
  }
}

</style>
