<template>
  <div class="graph">
    <p>{{ title }}</p>
    <div :id="title" class="realtimegraph"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    title: {
      type: String,
    },
    rawdata: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
    },
    min: {
      type: String,
      default: 'auto',
    },
    max: {
      type: String,
      default: 'auto',
    },
  },
  data: () => ({
    // Chart Setting
    chart: null,
    loadingMessage: {
      text: '讀取中',
      color: '#FE6B6B',
      textColor: '#FFF',
      maskColor: 'rgba(57, 63, 79, 0.8)',
      zlevel: 0,
    },
  }),
  mounted() {
    const ctx = document.getElementById(this.title)
    this.chart = echarts.init(ctx)
    this.chart.showLoading('default', this.loadingMessage)

    // Draw Chart
    this.chart.setOption({
      hoverLayerThreshold: 10,
      // animation: false,
      grid: {
        show: true,
        borderColor: '#5B6378',
        left: 40,
        right: 30,
        top: 10,
        bottom: 20,
      },
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
        min: this.min,
        max: this.max,
        axisLine: {
          lineStyle: {
            // Text Color (yAxis)
            color: '#99A4C1',
          },
        },
        splitLine: {
          lineStyle: {
            // Line Color (yAxis)
            color: '#71819C',
          },
        },
      },
      series: [{
        name: 'datas',
        itemStyle: { normal: { color: '#9FA5B3' } },
        showSymbol: false,
        type: this.type,
        data: this.nullArray(200),
      }],
    })

    setTimeout(() => {
      this.pushdata(this.rawdata)
    }, 500)
  },
  beforeDestroy() {

  },
  watch: {
    rawdata() {
      // if (this.rawdata.length > 10) {
      this.pushdata(this.rawdata)
      // }
    },
    '$store.state.report.timestamp': function () {
      this.chart.showLoading('default', this.loadingMessage)
    },
  },
  methods: {
    nullArray(num) {
      return Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0)
    },
    pushdata(datas) {
      // const data = []
      // datas.map((obj) => {
      //   data.push(obj.data)
      // })

      this.chart.setOption({
        series: [{
          name: 'datas',
          data: datas,
        }],
      })
      setTimeout(() => {
        this.chart.hideLoading()
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  padding: 25px 0 0px 0;
}


.graph {
  p {
    text-transform: capitalize;
    font-weight: 900;
    font-size: 30px;
    color: #C6CBD9;
  }

  .realtimegraph {
    // margin-top: 15px;
    // margin-bottom: 30px;
    height: 18vh;
    width: 80vw;
    @media screen and (max-width: 1200px) {
      width: 90vw;
    }
  }
}
</style>
