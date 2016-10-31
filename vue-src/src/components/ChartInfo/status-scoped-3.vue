<template>
  <div class="status">
    <div><span>Power Signal(RMS)</span>{{ powersignalAVG }} V</div>
    <div><span>Fundamental(RMS)</span>{{ fundamentalAVG }} V</div>
    <div><span>Power(RMS)</span>{{ powerAVG }} W</div>
  </div>
</template>

<script>
export default {
  computed: {
    powersignalAVG() {
      return this.$store.state.powersignalAVG
    },
    fundamentalAVG() {
      return this.$store.state.fundamentalAVG
    },
    powerAVG() {
      return this.$store.state.powerAVG
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
}
</style>
