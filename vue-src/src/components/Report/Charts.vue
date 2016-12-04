<template>
  <div>
    <chart
      :title="$store.state.report.harmonic.title"
      :rawdata.sync="$store.state.report.harmonic.rawdata"
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
