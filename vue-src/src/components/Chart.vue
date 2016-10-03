<template>
  <div>
    <p class="err-msg" v-show="dberr">{{ dberr }}</p>
    <canvas  id="myChart" class="realtimegraph" v-show="!dberr"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  data: () => {
    return {
      dberr: null,
      timer: null,
      // dbinfo: null,
      chartDataSetting: null,
      myLineChart: null,
    }
  },
  components: {
    // 'list-component': listComponent,
  },
  mounted() {
    this.$on('drawdbchart', this.drawdbchart)

    // Chart Setting
    Chart.defaults.global.tooltips.enabled = 0
    Chart.defaults.global.animation.duration = 0

    const nullArray = () => {
      return Array.apply(null, new Array(200)).map(Number.prototype.valueOf, 0)
    }

    // canavs size setting
    const ctx = document.getElementById('myChart')
    ctx.width = window.innerWidth
    ctx.height = window.innerHeight / 100 * 50
    console.log(window.innerWidth)
    if (window.innerWidth < 1140 && window.innerWidth > 720) {
      ctx.height = ctx.height / 50 * 30
    } else if (window.innerWidth <= 720) {
      ctx.height = ctx.height / 50 * 20
    }

    this.chartDataSetting = {
      labels: nullArray(),
      datasets: [
        {
          label: 'rawdata',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#55AFD6',
          borderColor: '#55AFD6',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#55AFD6',
          pointBackgroundColor: '#55AFD6',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: '#55AFD6',
          pointHoverBorderColor: '#55AFD6',
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nullArray(),
          spanGaps: false,
        },
        {
          label: 'rawdata-rms',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FFF55B',
          borderColor: '#FFF55B',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#FFF55B',
          pointBackgroundColor: '#FFF55B',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: '#FFF55B',
          pointHoverBorderColor: '#FFF55B',
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nullArray(),
          spanGaps: false,
        },
        {
          label: 'dfs',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FB6A72',
          borderColor: '#FB6A72',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#FB6A72',
          pointBackgroundColor: '#FB6A72',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: '#FB6A72',
          pointHoverBorderColor: '#FB6A72',
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nullArray(),
          spanGaps: false,
        },
        {
          label: 'dfs-rms',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#87D655',
          borderColor: '#87D655',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#87D655',
          pointBackgroundColor: '#87D655',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: '#87D655',
          pointHoverBorderColor: '#87D655',
          pointHoverBorderWidth: 0,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nullArray(),
          spanGaps: false,
        },
      ],
    }

    this.myLineChart = new Chart(ctx, {
      type: 'line',
      data: this.chartDataSetting,
      options: {
        legend: {
          position: 'bottom',
          display: true,
          labels: {
            padding: 20,
            boxWidth: 12,
            fontSize: 12,
            fontColor: '#E2E2E2',
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: '#5B6378',
              lineWidth: '1',
            },
            ticks: {
              fontColor: '#E2E2E2',
              suggestedMin: -200,
              suggestedMax: 200,
            },
          }],
          xAxes: [{
            display: false,
          }],
        },
      },
    })
  },
  methods: {
    drawdbchart(res) {
      // Reset Chart
      this.dberr = 0
      clearInterval(this.timer)

      if (res.status === '400') {
        this.dberr = JSON.stringify(res.msg, 0, 2)
        return
      }
      this.chartDataSetting.datasets[0].data = this.nullArray()
      this.chartDataSetting.datasets[1].data = this.nullArray()
      this.chartDataSetting.datasets[2].data = this.nullArray()
      this.chartDataSetting.datasets[3].data = this.nullArray()

      // TODO let data input this, and dump to Chart
      const rawdata = res.data.rawdata
      const sourcerms = res.data.sourcerms
      const dfs = res.data.dfs
      const rms = res.data.rms
      const zc = res.data.zc
      // this.dbinfo = {
      //   count: res.data.count,
      //   zc: res.data.zc,
      //   length: JSON.stringify(res.data.length),
      // }
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
    nullArray: () => {
      return Array.apply(null, new Array(200)).map(Number.prototype.valueOf, 0)
    },
    pushDataToChart(array) {
      this.chartDataSetting.labels.splice(0, 1)
      this.chartDataSetting.labels.push('0')

      array.map(({ name, value }) => {
        if (name === 'rawdata') {
          this.chartDataSetting.datasets[0].data.splice(0, 1)
          this.chartDataSetting.datasets[0].data.push(value.data)
        }

        if (name === 'sourcerms') {
          this.chartDataSetting.datasets[1].data.splice(0, 1)
          this.chartDataSetting.datasets[1].data.push(value.data)
        }

        if (name === 'dfs') {
          this.chartDataSetting.datasets[2].data.splice(0, 1)
          this.chartDataSetting.datasets[2].data.push(value.data)
        }

        if (name === 'rms') {
          this.chartDataSetting.datasets[3].data.splice(0, 1)
          this.chartDataSetting.datasets[3].data.push(value.data)
        }
      })

      this.myLineChart.update()
    },
  },
}
</script>

<style lang="scss" scoped>

.realtimegraph {
  // margin-top: 15px;
  // margin-bottom: 30px;
  // height: 501px;
}

.err-msg {
  color: white;
}
</style>
