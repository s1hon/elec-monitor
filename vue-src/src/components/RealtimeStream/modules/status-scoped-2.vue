<template>
  <div class="status">
    <div class="tmp"><span>基頻</span>{{ baseband }} Hz</div>
    <div class="tmp"><span>基頻(ZC)</span>{{ zc }} Hz</div>
    <div class="tmp"><span>電壓變異</span>{{ swellsagV }}%</div>
    <div class="lonlot"><span>THD</span>{{ thd }}%</div>
    <div class="hum" v-for="(item, index) in harmonics">
      <span>諧波({{ index + 1 }})</span>{{ item }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    zc() {
      return this.$store.state.live.zc
    },
    harmonics() {
      return this.$store.getters.live_harmonics
    },
    baseband() {
      return this.$store.getters.live_baseband
    },
    thd() {
      return this.$store.getters.live_thd
    },
    swellsag() {
      return this.$store.getters.live_swellsag
    },
    swellsagV() {
      return this.$store.state.live.swellsagV
    },
  },
}
</script>

<style lang="scss" scoped>
.status {
  font-size: 20px;
  font-weight: 100;

  div {
    clear: left;
  }

  span {
    float: left;
    width: 210px;
  }
}
</style>
