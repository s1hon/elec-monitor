// ************
// Vue.js
// ************

/**
 * History component @Vue
 */

const historylistHTML = `
    <div class="history col-xl-6">
      <p class="title">歷史事件</p>
      <div class="list col-xl-12">
        <div class="time">2016.08.15  15:32:20</div>
        <div class="idicon" style="background: #FB6A72; color: #E2E2E2;">Sensor #1</div>
        <div class="info">異常訊號發生 (查看)</div>
      </div>
    </div>
  `

const historyinfoHTML = `
    <div class="clickinfo col-xl-6">
      <div class="title col-xl-12">
        2016.08.15 15:32:20<br>
        Sensor #1 異常訊號發生
        <div class="close">X</div>
      </div>
      <div class="graph">
      </div>
    </div>
  `

const historyHTML = `
    <div class="row">
      <historylist-component></historylist-component>
      <historyinfo-component></historyinfo-component>
    </div>
  `

const historylistComponent = Vue.extend({
  template: historylistHTML,
})

const historyinfoComponent = Vue.extend({
  template: historyinfoHTML,
})

const historyComponent = Vue.extend({
  template: historyHTML,
  components: {
    'historylist-component': historylistComponent,
    'historyinfo-component': historyinfoComponent,
  },
})

/**
 * List component @Vue
 */

const listHTML = `
<div class="row">
  <div class="dblist col-xl-12">
    <a v-for="db in dblist" v-on:click="getdbChart($event)">{{ db }}</a>
  </div>
</div>
`

const listComponent = Vue.extend({
  template: listHTML,
  data: () => {
    return {
      dblist: null,
      timer: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const xhr = new XMLHttpRequest()
      const self = this
      xhr.open('GET', 'http://localhost:8080/api/v1/list')
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        if (res.status === '400') {
          self.dblist = res.msg
        } else {
          self.dblist = res.data
        }
      }
      xhr.send()
    },
    getdbChart(e) {
      this.request(e)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.request(e)
      }, 7000)
    },
    request(e) {
      const xhr = new XMLHttpRequest()
      // const self = this
      xhr.open('GET', `http://localhost:8080/api/v1/rawdata/${e.target.text}`)
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        // if (res.status === '400') {
        this.$dispatch('drawdbChart', res)
      }
      xhr.send()
    },
  },
})

/**
 * Chart component @Vue
 */

const chartHTML = `
    <list-component></list-component>
    {{ dberr }}
    <div class="row">
      <div class="chart col-xl-12">
        <canvas id="myChart" class="realtimegraph">
        </canvas>
        <p> ZC: {{ dbinfo.zc | JSON }} </p>
        <p> Length: {{ dbinfo.length | JSON }} </p>
        <p> Count: {{ dbinfo.count | JSON }} </p>
      </div>
    </div>
  `

const chartComponent = Vue.extend({
  template: chartHTML,
  data: () => {
    return {
      dberr: null,
      timer: null,
      dbinfo: null,
    }
  },
  components: {
    'list-component': listComponent,
  },
  events: {
    drawdbChart(res) {
      if (res.status === '400') {
        this.dberr = res.status
        return
      }
      chartDataSetting.datasets[0].data = this.nullArray()
      chartDataSetting.datasets[1].data = this.nullArray()
      chartDataSetting.datasets[2].data = this.nullArray()

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
          }
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
      chartDataSetting.labels.splice(0, 1)
      chartDataSetting.labels.push('0')

      array.map(({ name, value }) => {
        if (name === 'rawdata') {
          chartDataSetting.datasets[0].data.splice(0, 1)
          chartDataSetting.datasets[0].data.push(value.data)
        }

        if (name === 'dfs') {
          chartDataSetting.datasets[1].data.splice(0, 1)
          chartDataSetting.datasets[1].data.push(value.data)
        }

        if (name === 'rms') {
          chartDataSetting.datasets[2].data.splice(0, 1)
          chartDataSetting.datasets[2].data.push(value.data)
        }
      })

      myLineChart.update()

      // if (data.labels.length > 200) {
      //   data.labels.splice(0, 1)
      //   data.datasets[0].data.splice(0, 1)
      // }
      //
      // data.labels.push(msg.time)
      // data.datasets[0].data.push(msg.value)
      // myLineChart.update()
    },
  },
})

const appHTML = `
    <div class="row">
      <div class="banner col-xl-3">
      <h1>監控中心</h1>
      </div>
    </div>
    <chart-component></chart-component>
    <history-component></history-component>
  `

/**
 * App component @Vue
 */

const appComponent = Vue.extend({
  template: appHTML,
  components: {
    'chart-component': chartComponent,
    'history-component': historyComponent,
    'list-component': listComponent,
  },
})

Vue.component('app', appComponent)

new Vue({
  el: '.container',
})

// ************
// Chart
// ************

Chart.defaults.global.tooltips.enabled = 0
Chart.defaults.global.animation.duration = 0
const nullArray = function() {
  return Array.apply(null, new Array(200)).map(Number.prototype.valueOf,0)
}

const ctx = document.getElementById('myChart')
const chartDataSetting = {
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

const myLineChart = new Chart(ctx, {
  type: 'line',
  data: chartDataSetting,
  options: {
    scales: {
      xAxes: [{
        display: false,
      }],
    },
  },
})
