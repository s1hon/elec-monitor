<template>
  <div class="row">
    <div class="banner">

      <div class="title col-md-3">
        <p>雲端電力檢測平台</p>
      </div>

      <div class="dblist col-md-9">
        <div v-for="db in dblist">
          <a v-on:click="getdbChart($event)">{{ db }}</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {

  data: () => {
    return {
      dblist: null,
      timer: null,
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      const xhr = new XMLHttpRequest()
      const self = this
      xhr.open('GET', '/api/v1/list')
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        if (res.status === '400') {
          self.dblist = res.msg
        } else {
          self.dblist = res.data
        }
      }
      xhr.send()
    },

    getdbChart(e) {
      this.request(e)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.request(e)
      }, 7000)
    },

    request(e) {
      const xhr = new XMLHttpRequest()
      // const self = this
      xhr.open('GET', `/api/v1/rawdata/${e.target.text}`)
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        // if (res.status === '400') {
        this.$dispatch('drawdbChart', res)
      }
      xhr.send()
    },
  },

}
</script>

<style lang="scss" scoped>

.banner {

  .title {
    float: left;
    // height: 10vw;

    p {
      padding-top:1.3vw;
      color: #E2E2E2;
      font-size: 2.8vw;
      font-weight: 200;
      // width: 25vw;
    }

  }

  .dblist {
    float: left;
    // width: 75vw;
    // height: 10vw;
    padding-top: 1%;

    div {
      float: left;
      width: 8%;
      height: 20%;
      color: white;
      font-weight: 100;

      a {
        font-size: 1.3vw;
      }
      // background: white;
      // flex box
      display: -webkit-flex;
      display:         flex;
      -webkit-align-items: center;
              align-items: center;
      -webkit-justify-content: center;
              justify-content: center;
    }
  }
}

</style>
