<template>
  <div class="date">
    <div class="ti">時間</div>
    <div class="day">{{day}}</div>
    <div class="time">{{time}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    day() {
      return this.$store.state.live.day
    },
    time() {
      return this.$store.state.live.time
    },
  },
}
</script>

<style lang="scss" scoped>
  .date {
    padding: 5px 45px 0 0;
    // height: 25vh;

    .ti {
      font-weight: 100;
      width: 100%;
    }

    .day {
      font-weight: 100;
      font-size: 32px;
      @media screen and (max-width: 1200px) {
        width: 200px;
        float: left;
        margin-bottom: -20px;
      }
      @media screen and (max-width: 720px) {
        width: 190px;
        float: left;
        margin-bottom: -20px;
      }
    }

    .time {
      font-weight: 300;
      margin-top: -20px;
      font-size: 60px;
      @media screen and (max-width: 1200px) {
      }
    }
  }
</style>
