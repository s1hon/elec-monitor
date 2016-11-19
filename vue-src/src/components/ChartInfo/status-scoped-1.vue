<template>
  <div class="dos">
    <div class="tmp"><span>溫度</span>{{temp}} °C</div>
    <div class="hum"><span>濕度</span>{{hum}}%</div>
    <div class="lonlot" v-show="lon"><span>經緯度</span>{{lon}}, {{lat}}</div>
  </div>
</template>

<script>
export default {
  computed: {
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
}
</script>

<style lang="scss" scoped>
.dos {
  font-size: 20px;
  font-weight: 100;

  span {
    float: left;
    width: 80px;
  }
}
</style>
