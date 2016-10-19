<template>
  <div class="status">
    <div class="tmp"><span>驟升降</span>N/A</div>
    <div class="tmp"><span>基頻</span>60.001 Hz</div>
    <div class="hum"><span>諧波(1)</span>(180, 0.2)</div>
    <div class="hum"><span>諧波(2)</span>(300, 0.1)</div>
    <div class="hum"><span>諧波(3)</span>(300, 0.1)</div>
    <div class="lonlot"><span>THD</span>22.36%</div>
  </div>
</template>

<script>
export default {
  computed: {
    // sitename() {
    //   return this.$store.state.sitename
    // },
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
