<template>
  <div class="cal">
    <span>起始時間：<input class="input" size="10" type="text" @click.stop="open($event,'fromDate')" v-model="$store.state.report.calendar.items.fromDate.value"></span>
    <span>結束時間：<input class="input" size="10" type="text" @click.stop="open($event,'toDate')" v-model="$store.state.report.calendar.items.toDate.value"></span>

    <calendar
    :show.sync="$store.state.report.calendar.show"
    :type="$store.state.report.calendar.type"
    :value.sync="$store.state.report.calendar.value"
    :x="$store.state.report.calendar.x"
    :y="$store.state.report.calendar.y"
    :begin.sync="$store.state.report.calendar.begin"
    :end.sync="$store.state.report.calendar.end"
    :range.sync="$store.state.report.calendar.range"
    :weeks="$store.state.report.calendar.weeks"
    :months="$store.state.report.calendar.months"
    :sep="$store.state.report.calendar.sep"
    >

    </calendar>
  </div>
</template>

<script>
import moment from 'moment'
import calendar from './modules/Calendar.vue'

export default {
  components: {
    calendar,
  },
  mounted() {
    // this.$store.state.report.calendar.begin = '2016/11/17'
    // this.$store.state.report.calendar.end = '2016/11/20'
  },
  data() {
    return {
      start: null,
      end: null,
      msg: null,
    }
  },
   // 处理值的传递
  watch: {
    '$store.state.report.calendar.value': function (value) {
      const picker = this.$store.state.report.calendar.picker
      const calItems = this.$store.state.report.calendar.items
      if (calItems[picker].value === value) {
        return
      }
      calItems[picker].value = value

      // if fish toDATE chose, and send ajax to server
      if (calItems.fromDate.value !== '' && calItems.toDate.value !== '') {
        this.start = moment(calItems.fromDate.value).valueOf()
        this.end = moment(calItems.toDate.value).valueOf()
        this.$store.dispatch('CALENDAR_REQUEST', { start: this.start, end: this.end })
      }
    },
  },
  methods: {
    // 打开显示选择器
    open(e, type) {
      const calendar = this.$store.state.report.calendar
      // 设置类型
      calendar.picker = type
      calendar.type = calendar.items[type].type
      if (calendar.items[type].value !== '') {
        calendar.value = calendar.items[type].value
      } else {
        calendar.value = ''
      }

      // calendar.range = calendar.items[type].range
      // calendar.begin = calendar.items[type].begin
      // calendar.end = calendar.items[type].end

      // 可不用写
      // calendar.sep = calendar.items[type].sep
      // calendar.weeks = calendar.items[type].weeks
      // calendar.months = calendar.items[type].months

      calendar.show = true
      calendar.x = e.target.offsetLeft
      calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
    },
  },
}
</script>

<style lang="scss" scoped>
.cal {
  color: white;
  padding-top: 30px;

  span {
    padding-right: 30px;
    input {
      width: 200px;
    }
  }
}
</style>
