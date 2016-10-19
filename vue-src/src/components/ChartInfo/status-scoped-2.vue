<template>
  <div class="status">
    <div class="tmp">驟升降　N/A</div>
    <div class="tmp">基　頻　60.001 Hz</div>
    <div class="hum">諧　波　(180, 0.2) (300, 0.1)</div>
    <div class="lonlot">THD　　22.36%</div>
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
