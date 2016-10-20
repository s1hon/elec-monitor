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
}
</style>
