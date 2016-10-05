<template>
  <div>
    <div class="row headtitle">
      雲端電力檢測平台
    </div>

    <div class="row icon">
      <div class="svgicon icon-chose">
        <svg width="80%" viewBox="41 131 186 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Group" stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(41.000000, 131.000000)">
                <text id="即時狀態" font-size="35" font-weight="normal">
                    <tspan x="48" y="37">即時狀態</tspan>
                </text>
                <polygon id="Path-3" transform="translate(16.765169, 26.559102) rotate(13.000000) translate(-16.765169, -26.559102) " points="19.2974889 6.79958138 5.03615123 26.559102 15.8867869 30.417007 9.18734661 46.3186227 28.4941876 23.3949998 15.8867869 23.3949998"></polygon>
            </g>
        </svg>
      </div>

      <div class="svgicon icon-un-chose">
        <svg width="80%" viewBox="36 219 192 49" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Group-3" stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(37.000000, 219.000000)">
                <g id="Group-Copy" transform="translate(51.000000, 0.000000)" font-size="35" font-weight="normal">
                    <text id="歷史紀錄">
                        <tspan x="0" y="37">歷史紀錄</tspan>
                    </text>
                </g>
                <g id="Group-2" transform="translate(0.000000, 6.000000)" stroke="#FFFFFF">
                    <path d="M19.4594595,40 C30.2066222,40 38.9189189,31.2877032 38.9189189,20.5405405 L19.4594595,20.5405405 L19.4594595,1.08108108 C8.71229676,1.08108108 0,9.79337784 0,20.5405405 C0,31.2877032 8.71229676,40 19.4594595,40 Z" id="Oval"></path>
                    <path d="M40,19.4594595 C40,8.71229676 31.2877032,0 20.5405405,0 C20.5405405,7.7161037 20.5405405,19.4594595 20.5405405,19.4594595 C20.5405405,19.4594595 30.4381877,19.4594595 40,19.4594595 Z" id="Oval"></path>
                </g>
            </g>
        </svg>
      </div>
    </div>


    <div class="row dblist">
      <div class="title">
        Sensor List
      </div>
      <div class="item" v-bind:id="db" v-for="db in dblist" v-on:click="getdbChart($event)">
        {{ db }}
      </div>
    </div>
  </div>
</template>

<script>
export default {

  // Used datas
  data: () => {
    return {
      dblist: null,
      timer: null,
    }
  },

  // When created
  created() {
    this.fetchData()
  },

  // fetchData, getdbChart, request
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
      }, 9000)
    },

    request(e) {
      const xhr = new XMLHttpRequest()
      const self = this
      xhr.open('GET', `/api/v1/rawdata/${e.target.id}`)
      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText)
        // if (res.status === '400') {
        // this.$emit('drawCallToApp', res)
        self.$parent.$emit('getinfo', res)
      }
      xhr.send()
    },
  },

}
</script>

<style lang="scss" scoped>

.headtitle {

  font-weight: 250;
  background-color: #FE6B6B;
  font-size: 26px;
  color: #FFFFFF;
  padding: 19px 13px 17px 13px;
  display: -webkit-flex;
  display:         flex;
  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;
}

.icon {

  &:hover {
    cursor: pointer;
  }

  padding-top: 10px;
  padding-bottom: 10px;

  .icon-chose {
    fill: #FE6B6B;
  }

  .icon-un-chose {
    fill: #4C5461;
  }

  .svgicon {
    padding: 10px 0px 10px 20px;
    @media screen and (max-width: 1200px) {
      width: 200px;
      float: left;
    }
  }

}

.dblist {

  .title {

    background-color: #9FA5B3;
    color: #F2F0F1;
    padding: 2px 0 2px 20px;
    font-size: 20px;
  }

  .item {

    &:hover {
      cursor: pointer;
    }

    float: left;
    width: 33.333%;
    height: 37px;
    background-color: #D8D8D8;
    color: #4C5461;
    display: -webkit-flex;
    display:         flex;
    -webkit-align-items: center;
            align-items: center;
    -webkit-justify-content: center;
            justify-content: center;
  }

  .item-chose {
    background-color: #FE6B6B;
    color: #FFF;
  }
}
</style>
