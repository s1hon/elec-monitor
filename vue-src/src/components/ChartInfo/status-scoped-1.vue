<template>
  <div class="dos">
    <div class="tmp">溫　度　{{temp}} °C</div>
    <div class="hum">濕　度　{{hum}}%</div>
    <div class="lonlot" v-show="lon">經緯度　{{lon}}, {{lat}}</div>
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
  // background-color: black;
  // margin-top: 35px;
  // padding: 0 0 5px 80px;

  // @media screen and (max-width: 720px) {
  //   float: left;
  //
  //   div {
  //     // float: left;
  //     padding: 5px 15px 0px 5px;
  //   }
  //   padding: 0px 0 5px 15px;
  // }
}
</style>
