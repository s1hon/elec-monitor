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
      <historylist-component></historylis t-component>
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
