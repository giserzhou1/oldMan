<template>
  <div class="contain">
    <div id="mapContainer"> </div>
    <div class="input-card">
      <el-select v-model="value" placeholder="地理围栏">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
        </el-select>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap'

  export default {
    name: "Map",
    data() {
      return {
        map: null,
        marker: '',
        snMarker: new Map(),
        mouseTool: null,
        options: [{
          value: '选项1',
          label: '多边形'
        }, {
          value: '选项2',
          label: '矩形'
        }, {
          value: '选项3',
          label: '圆形'
        }, {
          value: '选项4',
          label: '新建围栏'
        }, {
          value: '选项5',
          label: '重置围栏'
        },{
          value: '选项6',
          label: '清除围栏'
        }
        ],
        value: ''
      }
    },
    methods: {
      init() {
        this.initMap()
      },
      initMap() {
        this.map = new AMap.Map('mapContainer', {
          zoom: 11,
          // dragEnable: false
        })
        // 工具栏
        AMap.plugin('AMap.ToolBar', () => {
          let toolbar = new AMap.ToolBar()
          this.map.addControl(toolbar)
        })
        AMap.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
          })

          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
            // data是具体的定位信息
            console.log(data)
          })
          AMap.event.addListener(geolocation, 'error', function onError(err) {
            // 定位出错
            console.log(err)
          })
        })
        let trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 10
        });
        this.map.add(trafficLayer); //添加图层到地图
        // 创建一个 Marker 实例：
        let marker = new AMap.Marker({
          position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        // 将创建的点标记添加到已有的地图实例：
        this.map.add(marker)
        //   this.mouseTool = new AMap.MouseTool(this.map);
        // //监听draw事件可获取画好的覆盖物
        // let overlays = [];
        // this.mouseTool.on('draw', function (e) {
        //   overlays.push(e.obj);
        // })
        AMap.plugin('AMap.MouseTool', () => {
          let mouseTool = new AMap.MouseTool(this.map);
          let overlays = [];
          mouseTool.on(this.draw(), function (e) {
            overlays.push(e.obj);
          })
        })
      },
      draw(type) {
        switch (type) {
          case 'polygon': {
            this.mouseTool.polygon({
              fillColor: '#00b0ff',
              strokeColor: '#80d8ff'
              //同Polygon的Option设置
            });
            break;
          }
          case 'rectangle': {
            this.mouseTool.rectangle({
              fillColor: '#00b0ff',
              strokeColor: '#80d8ff'
              //同Polygon的Option设置
            });
            break;
          }
          case 'circle': {
            this.mouseTool.circle({
              fillColor: '#00b0ff',
              strokeColor: '#80d8ff'
              //同Circle的Option设置
            });
            break;
          }
        }
      },
    },

    mounted() {
      this.init()
    },
    destroyed() {
      this.map.destroy()
    }
  }
</script>

<style scoped lang='scss'>
  #mapContainer {
    width: 750px;
    // height: 1334px;
  }

  .contain {
    position: absolute;
  }

  .input-card {
    position: relative;
    bottom: 1300px;
    right: -200px;
    z-index: 1000;
  }

  .input-item {
    height: 22px;
  }

  .btn {
    width: 60px;
    margin: 0 10px 0 20px;
  }

  .input-text {
    width: 40px;
    margin-right: 10px;
  }
</style>