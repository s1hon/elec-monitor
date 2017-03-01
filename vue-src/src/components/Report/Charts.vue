<template>
  <div>
    <chart
      :type="$store.state.report.thd.type"
      :title="$store.state.report.thd.title"
      :rawdata.sync="$store.state.report.thd.rawdata"
    ></chart>
    <chart
      :min="$store.state.report.swellsagV.min"
      :max="$store.state.report.swellsagV.max"
      :type="$store.state.report.swellsagV.type"
      :title="$store.state.report.swellsagV.title"
      :rawdata.sync="$store.state.report.swellsagV.rawdata"
    ></chart>
    <chart
      :min="$store.state.report.kwh.min"
      :max="$store.state.report.kwh.max"
      :type="$store.state.report.kwh.type"
      :title="$store.state.report.kwh.title"
      :rawdata.sync="$store.state.report.kwh.rawdata"
    ></chart>
  </div>
</template>

<script>
import chart from './modules/Chart.vue'

export default {
  components: {
    chart,
  },
  mounted() {

  },
  data() {
    return {

    }
  },
  watch: {

  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>

</style>
