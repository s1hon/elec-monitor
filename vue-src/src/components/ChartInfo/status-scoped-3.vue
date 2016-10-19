<template>
  <div class="status">
    <div>Power Signal(RMS)　60.001</div>
    <div>Fundamental(RMS)　60.001</div>
    <div>Power(RMS)　99.11</div>
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
}
</style>
