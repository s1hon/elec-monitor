<template>
  <div>
    <div class="row title">
      <p v-show="!sitename">請選擇要檢視之站點</p>
      <p v-show="sitename">目標: {{sitename}}   ＃{{count}}</p>
    </div>

    <div v-show="sitename">
      <div class="row info-line-1">
        <div class="date col-xl-3 col-lg-3 col-md-4 col-xs-12">
          <div class="ti">時間</div>
          <div class="day">{{day}}</div>
          <div class="time">{{time}}</div>
        </div>

        <div class="dos col-xl-3 col-lg-3 col-md-4 col-xs-6">
          <div class="tmp">溫　度　{{temp}} °C</div>
          <div class="hum">濕　度　{{hum}}%</div>
          <div class="lonlot" v-show="lon">經緯度　{{lon}}, {{lat}}</div>
        </div>

        <div class="status col-xl-4 col-lg-6 col-md-4 col-xs-6">
          <div class="tmp">驟升降　N/A</div>
          <div class="tmp">基　頻　60.001 Hz</div>
          <div class="hum">諧　波　(180, 0.2) (300, 0.1)</div>
          <div class="lonlot">THD　　22.36%</div>
        </div>
      </div>

      <div class="row">
        <div id="fft" class="realtimegraph"></div>
      </div>
    </div>
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
  }),
  computed: {
    sitename() {
      return this.$store.state.sitename
    },
    count() {
      return this.$store.state.count
    },
    day() {
      return this.$store.state.day
    },
    time() {
      return this.$store.state.time
    },
    temp() {
      return this.$store.state.temp
    },
    hum() {
      return this.$store.state.hum
    },
    lon() {
      return this.$store.state.lon
    },
    lat() {
      return this.$store.state.lat
    },
  },
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
        left: 120,
        right: 120,
        top: 50,
        bottom: 30,
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
        name: 'fft',
        itemStyle: { normal: { color: '#55AFD6' } },
        showSymbol: false,
        type: 'line',
        data: this.nullArray(200),
      }],
    })

    this.$store.watch(() => this.$store.getters.timestamp, this.getchartinfo)
  },
  methods: {
    getchartinfo() {
      this.pushfft(this.$store.getters.fft)
    },
    nullArray(num) {
      return Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0)
    },
    pushfft(fft) {
      const label = []
      const data = []
      fft.map((obj) => {
        data.push(obj.data)
        label.push()
      })

      this.chart.setOption({
        series: [{
          name: 'fft',
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
.realtimegraph {
  // margin-top: 15px;
  // margin-bottom: 30px;
  height: 25vh;
  width: 80vw;
}

.title {
  color: #E2E2E2;
  background-color: #5B6378;
  font-size: 2.2vh;
  margin-top: 10px;
  padding: 8px 0 0 20px;
  height: 5vh;
}

.info-line-1 {
  color: #E2E2E2;
  margin-left: 20px;

  display: -webkit-flex;
  display:         flex;
  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;

  @media screen and (max-width: 940px) {
    display: inline;
    -webkit-align-items: left;
            align-items: left;
    -webkit-justify-content: top;
            justify-content: top;
    margin: 0;
  }

  .date {
    padding: 15px 0 5px 15px;
    // height: 25vh;

    .ti {
      font-weight: 100;
      width: 100%;
    }

    .day {
      font-weight: 100;
      font-size: 32px;
      @media screen and (max-width: 1200px) {
        width: 200px;
        float: left;
        margin-bottom: -20px;
      }
      @media screen and (max-width: 720px) {
        width: 190px;
        float: left;
        margin-bottom: -20px;
      }
    }

    .time {
      font-weight: 300;
      margin-top: -20px;
      font-size: 60px;
      @media screen and (max-width: 1200px) {
      }
    }
  }

  .dos, .status {
    font-size: 20px;
    font-weight: 100;
    // background-color: black;
    margin-top: 35px;
    padding: 0 0 5px 15px;
    @media screen and (max-width: 720px) {
      float: left;

      div {
        // float: left;
        padding: 5px 15px 0px 5px;
      }
      padding: 0px 0 5px 15px;
    }
  }

}
</style>
