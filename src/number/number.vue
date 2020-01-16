<template>
  <div class="trip">
    <!-- <MapLocation></MapLocation> -->
    <div v-show="$route.name !== 'Map'" class="trip-box">
      <!-- <img class="trip-bg" src="../../assets/img/bg.png" alt> -->
      <div class="trip-con">
        <md-tabs v-model="TripWay">
          <md-tab-pane name="心率" label="心率"></md-tab-pane>
          <md-tab-pane name="体温" label="体温"></md-tab-pane>
          <md-tab-pane name="步数" label="步数"></md-tab-pane>
        </md-tabs>
        <div class="trip-border">
          <p>三秒前更新</p>
          <strong>{{distance}}</strong>
          <p>{{unit}}</p>
        </div>
        <div class="trip-start" @click="statistical">历史统计</div>
      </div>
    </div>
  </div>
</template>
<script>
  // import { Tabs, TabPane, Button } from 'mand-mobile'
  // import { mapGetters } from 'vuex'
  export default {
    name: 'trip',
    data() {
      return {
        TripWay: '心率', // 出行方式
        // allDistanceData: null, // 当前出行总里程
        distance: '60',
        unit: '次',
        heart: 60,
        tem: '37',
        walk: '1',
        wayData: {
          p1: '心率',
          p2: '体温',
          p3: '步数',
        }
      }
    },
    computed: {},
    watch: {
      // eslint-disable-next-line no-unused-vars
      '$route'(to) {
        this.updataDistance(this.TripWay)
      },
      TripWay: {
        handler(val) {
          this.updataDistance(val)
        },
        immediate: true
      },
      // heart:{
      //   // eslint-disable-next-line no-unused-vars
      //   handler(val) {
      //     this.updataDistance('心率')
      //   },
      //   immediate: true
      // },   
    },
    mounted(){
           setInterval(()=> {
            this.heart = this.randomNum(60,80,0)
            this.tem = this.randomNum(36.7,37.6,1)
            this.walk++
          },3000)
    },
    methods: {
      updataDistance(val) {
        switch (val) {
          case '心率':
            this.distance = this.heart
            this.unit = '次'
            break
          case '体温':
            this.distance = this.tem
            this.unit = '摄氏度'
            break
          case '步数':
            this.distance = this.walk
            this.unit = '步'
            break
        }
      },
      statistical(){
            this.$router.push('/number')
      },
      randomNum(maxNum, minNum, decimalNum) {
        var max = 0,
          min = 0;
        minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
        switch (arguments.length) {
          case 1:
            return Math.floor(Math.random() * (max + 1));
          case 2:
            return Math.floor(Math.random() * (max - min + 1) + min);
          case 3:
            return (Math.random() * (max - min) + min).toFixed(decimalNum);
          default:
            return Math.random();
        }
      }
  }}
</script>

<style lang="scss" scoped>
  .trip {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000;
    .trip-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5;
    }

    .trip-con {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }

    .trip-border {
      width: 450px;
      height: 450px;
      border-radius: 450px;
      margin: 100px auto;
      border: 8px dashed #c5d1d3;
      border-bottom: none;

      p:nth-child(1) {
        text-align: center;
        margin-top: 80px;
        color: #4e4956;
        font-size: 33px;
        letter-spacing: 2px;
      }

      strong {
        display: block;
        text-align: center;
        margin-top: 35px;
        color: #4e4956;
        font-size: 130px;
      }

      p:nth-child(3) {
        text-align: center;
        margin-top: 35px;
        color: #9a9b9b;
        font-size: 28px;
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .trip-start {
      width: 500px;
      height: 90px;
      border-radius: 90px;
      margin: auto;
      background: #57c595;
      text-align: center;
      line-height: 90px;
      color: #ffffff;
      font-size: 33px;
      letter-spacing: 2px;
    }

    .trip-map {
      widows: 100%;
      height: 100%;
    }
  }

  .fademap-enter {
    opacity: 0;
  }

  .fademap-enter-active {
    transition: all 0.3s;
  }

  .fademap-leave-to {
    opacity: 0;
  }

  .fademap-leave-active {
    transition: all 0.3s;
  }
</style>
<style lang="scss">
  .md-tab-bar {
    background-color: transparent;
  }
</style>