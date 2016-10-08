<template>
  <div id="app" class="container-fluid" ref="app">
    <div class="row">
      <div class="col-xl-2 sidebar">
        <sidebar ref="sidebar"></sidebar>
      </div>
      <div class="col-xl-10 context">
        <context ref="context"></context>
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
}
</script>

<style lang="scss">

body {

  &:hover {
    cursor: default;
  }

  font-family: 'Noto Sans TC', 'PingFangTC-Regular';
  height: 100vh;
  background: #393F4F;

  // Disable select
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently
                                  not supported by any browser */
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

.stop-scrolling {
  height: 100%;
  overflow: hidden;
}

</style>
