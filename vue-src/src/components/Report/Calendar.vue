<template>
  <div class="cal">
    <span>起始時間：<input class="input" size="10" type="text" @click.stop="open($event,'fromDate')" v-model="$store.state.calendar.items.fromDate.value"></span>
    <span>結束時間：<input class="input" size="10" type="text" @click.stop="open($event,'toDate')" v-model="$store.state.calendar.items.toDate.value"></span>

    <calendar
    :show.sync="$store.state.calendar.show"
    :type="$store.state.calendar.type"
    :value.sync="$store.state.calendar.value"
    :x="$store.state.calendar.x"
    :y="$store.state.calendar.y"
    :begin.sync="$store.state.calendar.begin"
    :end.sync="$store.state.calendar.end"
    :range.sync="$store.state.calendar.range"
    :weeks="$store.state.calendar.weeks"
    :months="$store.state.calendar.months"
    :sep="$store.state.calendar.sep"
    >

    </calendar>

    <div>
      {{ msg }} <br>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import calendar from '../modules/Calendar.vue'

export default {
  components: {
    calendar,
  },
  created() {
    this.$store.state.calendar.begin = '2016/11/17'
    this.$store.state.calendar.end = '2016/11/20'
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
    '$store.state.calendar.value': function (value) {
      const picker = this.$store.state.calendar.picker
      const calItems = this.$store.state.calendar.items
      calItems[picker].value = value

      // if fish toDATE chose, and send ajax to server
      if (calItems.fromDate.value !== '' && calItems.toDate.value !== '') {
        this.start = moment(calItems.fromDate.value).valueOf()
        this.end = moment(calItems.toDate.value).valueOf()
        this.request(this.start, this.end)
      }
    },
  },
  methods: {
    // 打开显示选择器
    open(e, type) {
      // 设置类型
      this.$store.state.calendar.picker = type
      this.$store.state.calendar.type = this.$store.state.calendar.items[type].type
      if (this.$store.state.calendar.items[type].value !== '') {
        this.$store.state.calendar.value = this.$store.state.calendar.items[type].value
      } else {
        this.$store.state.calendar.value = ''
      }

      // this.$store.state.calendar.range = this.$store.state.calendar.items[type].range
      // this.$store.state.calendar.begin = this.$store.state.calendar.items[type].begin
      // this.$store.state.calendar.end = this.$store.state.calendar.items[type].end

      // 可不用写
      // this.$store.state.calendar.sep = this.$store.state.calendar.items[type].sep
      // this.$store.state.calendar.weeks = this.$store.state.calendar.items[type].weeks
      // this.$store.state.calendar.months = this.$store.state.calendar.items[type].months

      this.$store.state.calendar.show = true
      this.$store.state.calendar.x = e.target.offsetLeft
      this.$store.state.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
    },
    request(start, end) {
      this.msg = ''
      const xhr = new XMLHttpRequest()
      const self = this
      xhr.open('GET', `/api/v1/search/${this.$store.state.live.sitename}?g=harmonic,thd&start=${this.start}&end=${this.end}`)
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        this.$store.commit('REQUEST', { path: this.$route.path, res })
        this.msg = res
      }
      xhr.send()
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
  }
}
</style>
