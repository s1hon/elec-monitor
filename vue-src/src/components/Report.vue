<template>
  <div class="row">
    <div class="fail" v-if="!this.$store.state.live.sitename">
      請先選擇站點
    </div>
    <div class="exist" v-if="this.$store.state.live.sitename">
      <div class="title">
        {{ this.$store.state.live.sitename }} 報告總覽
      </div>
      <calendar></calendar>
    </div>
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
.fail {
  color: white;
  padding: 30px;
}

.exist {
  padding-left: 30px;
  color: white;

  .title {
    font-size: 35px;
    padding-top: 30px;
  }
}
</style>
