<template>
  <div class="row">
    <div class="fail" v-if="!this.$store.state.live.sitename">
      請先選擇站點
    </div>
    <calendar></calendar>
  </div>
</template>

<script>
import calendar from './Report/Calendar.vue'

export default {
  components: {
    calendar,
  },
}
</script>

<style lang="scss" scoped>
.row {
  .cal {
    color: white;
    padding: 30px;
  }
}
</style>
