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
          <div class="tmp">驟升降　正常</div>
          <div class="hum">濕　度　{{hum}}%</div>
          <div class="lonlot">THD　　100</div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <canvas  id="myChart" class="realtimegraph"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  data: () => {
    return {
      sitename: null,
      count: null,
      day: null,
      time: null,
      temp: null,
      hum: null,
      lon: null,
      lat: null,
      fft: null,
    }
  },
  mounted() {
    this.$on('getchartinfo', this.getchartinfo)

    
  },
  methods: {
    getchartinfo(res) {
      this.sitename = res.sitename
      this.count = res.count
      this.day = moment(res.condition.time).format('YYYY/MM/DD')
      this.time = moment(res.condition.time).format('HH:mm:ss')
      this.temp = res.condition.temp
      this.hum = res.condition.hum
      this.lon = res.condition.lon
      this.lat = res.condition.lat
      this.fft = res.fft
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  color: #E2E2E2;
  background-color: #5B6378;
  font-size: 2.2vh;
  margin-top: 30px;
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
    font-size: 25px;
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
