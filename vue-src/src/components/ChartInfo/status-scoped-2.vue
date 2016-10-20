<template>
  <div class="status">
    <div class="tmp"><span>驟升降</span>{{ swellsag }}</div>
    <div class="tmp"><span>基頻</span>{{ harmonic.baseband }} Hz</div>

    <div class="hum" v-for="(item, index) in harmonic.harmonic">
      <span>諧波({{ index + 1 }})</span>{{ item }}
    </div>
    <div class="lonlot"><span>THD</span>{{ thd }}%</div>
  </div>
</template>

<script>
export default {
  computed: {
    // sitename() {
    //   return this.$store.state.sitename
    // },
    harmonic() {
      return this.$store.getters.harmonic
    },
    thd() {
      return this.$store.getters.thd
    },
    swellsag() {
      return this.$store.getters.swellsag
    },
  },
}
</script>

<style lang="scss" scoped>
.status {
  font-size: 20px;
  font-weight: 100;

  span {
    float: left;
    width: 210px;
  }
  // width: 400px;
  // background-color: black;
  // margin-top: 35px;
  // padding: 0 0 5px 15px;

  // @media screen and (max-width: 720px) {
  //   // float: left;
  //
  //   div {
  //     // float: left;
  //     padding: 5px 15px 0px 5px;
  //   }
  //   padding: 0px 0 5px 15px;
  // }

  // @media screen and (max-width: 1200px) {
  //   margin-top: 35px;
  // }
}
</style>
