<template>
  <div class="row">
    <div class="fail" v-if="!this.$store.state.sitename">
      請先選擇站點
    </div>
    <div class="exist" v-if="this.$store.state.sitename">
      <div class="title">
        {{ this.$store.state.sitename }} 報告總覽
      </div>
      <calendar></calendar>

      <div v-if="this.$store.state.report.timestamp">
        <div>
          {{ this.$store.state.report.msg }} <br>
        </div>
        <charts></charts>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import calendar from './Report/Calendar.vue'
import charts from './Report/Charts.vue'

export default {
  components: {
    calendar,
    charts,
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.dispatch('RESETDATA', this.$route.path)
    this.$store.state.sitename = 'site002'
  },
  watch: {
    '$store.state.sitename': function (sitename) {
      if (this.$store.state.report.calendar.xhr) {
        this.$store.state.report.calendar.xhr.abort()
      }
      this.$store.state.report.msg = ''
      this.setTimeRange(sitename)
    },
  },
  methods: {
    setTimeRange(sitename) {
      if (sitename) {
        this.$store.state.report.calendar.items.fromDate.value = ''
        this.$store.state.report.calendar.items.toDate.value = ''
        const xhr = new XMLHttpRequest()
        const self = this
        xhr.open('GET', `/api/v1/time/${sitename}`)
        xhr.onload = () => {
          const res = JSON.parse(xhr.responseText)
          // 2016/11/28 15:56:27
          this.$store.state.report.calendar.begin = moment(res.begin).format('YYYY/M/D h:m:s')
          this.$store.state.report.calendar.end = moment(res.end).format('YYYY/M/D h:m:s')
        }
        xhr.send()
      }
    },
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
    text-transform: capitalize;
    font-size: 35px;
    padding-top: 30px;
  }
}
</style>
