<template>
  <div class="row">
    <canvas id="myChart" class="realtimegraph">
    </canvas>
  </div>
  <p> ZC: {{ dbinfo.zc | JSON }} </p>
  <p> Length: {{ dbinfo.length | JSON }} </p>
  <p> Count: {{ dbinfo.count | JSON }} </p>
</template>

<script>
import Chart from 'chart.js'

export default {
  data: () => {
    return {
      dberr: null,
      timer: null,
      dbinfo: null,
      chartDataSetting: null,
      myLineChart: null,
    }
  },
  components: {
    // 'list-component': listComponent,
  },
  ready() {
    Chart.defaults.global.tooltips.enabled = 0
    Chart.defaults.global.animation.duration = 0
    const nullArray = () => {
      return Array.apply(null, new Array(200)).map(Number.prototype.valueOf, 0)
    }

    // canavs size setting
    const ctx = document.getElementById('myChart')
    ctx.width = window.innerWidth
    ctx.height = window.innerHeight / 100 * 50

    this.chartDataSetting = {
      labels: nullArray(),
      datasets: [
        {
          label: 'rawdata',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nullArray(),
          spanGaps: false,
        },
        {
          label: 'dfs',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(154,97,93,0.4)',
          borderColor: 'rgba(192,91,85,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(192,91,85,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(192,91,85,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: nullArray(),
          spanGaps: false,
        },
        {
          label: 'rms',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(125,126,94,0.4)',
          borderColor: 'rgba(191,192,103,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(191,192,103,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(191,192,103,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
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
        scales: {
          xAxes: [{
            display: false,
          }],
        },
      },
    })
  },

  events: {
    drawdbChart(res) {
      if (res.status === '400') {
        this.dberr = res.status
        return
      }
      this.chartDataSetting.datasets[0].data = this.nullArray()
      this.chartDataSetting.datasets[1].data = this.nullArray()
      this.chartDataSetting.datasets[2].data = this.nullArray()

      // TODO let data input this, and dump to Chart
      const rawdata = res.data.rawdata
      const dfs = res.data.dfs
      const rms = res.data.rms
      const zc = res.data.zc
      this.dbinfo = {
        count: res.data.count,
        zc: res.data.zc,
        length: JSON.stringify(res.data.length),
      }
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.pushDataToChart([
          {
            name: 'rawdata',
            value: rawdata[0] ? rawdata[0] : 0,
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
        dfs.splice(0, 1)
        rms.splice(0, 1)
      }, 20)
      // this.dberr = JSON.stringify(res.data)
    },
  },
  methods: {
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

        if (name === 'dfs') {
          this.chartDataSetting.datasets[1].data.splice(0, 1)
          this.chartDataSetting.datasets[1].data.push(value.data)
        }

        if (name === 'rms') {
          this.chartDataSetting.datasets[2].data.splice(0, 1)
          this.chartDataSetting.datasets[2].data.push(value.data)
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
  background: #7F7F7F;
}

.chart p {
  color: white;
}

</style>
