<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-xl-2 sidebar">
        <sidebar></sidebar>
      </div>
      <div class="col-xl-10 context">
        <context></context>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './sidebar.vue'
import context from './context.vue'

export default {
  components: {
    sidebar,
    context,
  },
  events: {
    drawdbChart(res) {
      this.$broadcast('drawdbChart', res)
    },
  },
}
</script>

<style lang="scss">

body {
  font-family: 'Noto Sans TC', 'PingFangTC-Regular';
  height: 100vh;
  background: #393F4F;

  // Disable select
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
}

.sidebar {
  height: 100vh;
  background-color: #F2F0F1;

  @media screen and (max-width: 1200px) {
    height: auto;
  }
}

.context {
  height: 100vh;
  background-color: #393F4F;

  @media screen and (max-width: 1200px) {
    height: auto;
  }
}

</style>
