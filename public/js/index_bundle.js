// ************
// Vue.js
// ************


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
