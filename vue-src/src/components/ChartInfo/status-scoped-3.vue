<template>
  <div class="status">
    <div><span>Power Signal(RMS)</span>60.001</div>
    <div><span>Fundamental(RMS)</span>60.001</div>
    <div><span>Power(RMS)</span>99.11</div>
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
}
</style>
