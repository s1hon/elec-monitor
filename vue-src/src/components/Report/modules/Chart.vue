<template>
  <div>
    {{ title }}
    {{ rawdata }}
    <div id="data" class="realtimegraph"></div>
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
    },
  },
  data: () => ({
    // Chart Setting
    chart: null,
  }),
  mounted() {
    const ctx = document.getElementById('data')
    this.chart = echarts.init(ctx)

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
        name: 'datas',
        itemStyle: { normal: { color: '#9FA5B3' } },
        showSymbol: false,
        type: 'line',
        data: this.nullArray(200),
      }],
    })
  },
  beforeDestroy() {

  },
  watch: {
    rawdata() {
      if (this.rawdata.length > 10) {
        this.pushdata(this.rawdata)
      }
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
  width: 80vw;
  @media screen and (max-width: 1200px) {
    width: 90vw;
  }
}
</style>
