<template>
<div class="mapContain">
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
    <md-notice-bar
      mode="closable"
      icon="volumn"
      scrollable
    >
     左侧工具栏可以设置不同的地理围栏，时刻知道老人位置
    </md-notice-bar>
  </div>
<div id="tp-weather-widget" style="positin:fixed;top:100px;right:500px"></div>
  <div class="map">
  </div>
  </div>
</template>

<script>
  import {NoticeBar} from 'mand-mobile'
  // import * as Vue2Leaflet from 'vue2-leaflet';
  import L from 'leaflet'
  //import { LMap, LTileLayer, LMarker, LPopup, LTooltip,LFeatureGroup } from 'vue2-leaflet';
  import 'leaflet-draw'
  export default {
    name: 'testMap',
    components: {
      // LMap,
      // LTileLayer,
      // LMarker,
      // LPopup,
      // LTooltip,
      // LFeatureGroup
      [NoticeBar.name]: NoticeBar,
    },
    
    data() {
      return {
        map: null,
        normal: null,
        stat: null,
        point: [],
        jc:[30.518220303179422, 114.4032096862793],
        fence: [],
        fc:[[30.527594345500283,114.38690348974056],[30.5281855437053,114.39883570285247],[30.525672926490586
,114.4052739473373],[30.520056253077477,114.40905105076841],[30.516360896170916
,114.4053597905971],[30.516065261549198,114.40287033606297],[30.51968672370905
,114.39591703201931],[30.52264291931643
,114.39171071228924],[30.52449049590728,114.38870619819632]]
      };
    },
    watch: {
      point: {
        // eslint-disable-next-line no-unused-lets
        handler(newVal) {
          console.log(newVal.latlng.lat)
          if (this.IsPtInPoly(newVal.latlng.lng, newVal.latlng.lat, this.fence)) {
            this.$message({
              message: "在围栏内",
              type: 'success'
            })
          } else {
            this.$message({
              message: "out",
              type: 'success'
            })
          }
        }
      }
    },
    methods: {
      IsPtInPoly(ALon, ALat, APoints) {
        console.log(APoints)
        console.log('kobe', typeof APoints[1], APoints[1].lng)
        let iSum = 0,
          iCount;
        let dLon1, dLon2, dLat1, dLat2, dLon;
        if (APoints.length < 3) return false;
        iCount = APoints.length;
        for (let i = 0; i < iCount; i++) {
          if (i == iCount - 1) {
            dLon1 = APoints[i].lng;
            dLat1 = APoints[i].lat;
            dLon2 = APoints[0].lng;
            dLat2 = APoints[0].lat;
          } else {
            dLon1 = APoints[i].lng;
            dLat1 = APoints[i].lat;
            dLon2 = APoints[i + 1].lng;
            dLat2 = APoints[i + 1].lat;
          }
          //以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
          if (((ALat >= dLat1) && (ALat < dLat2)) || ((ALat >= dLat2) && (ALat < dLat1))) {
            if (Math.abs(dLat1 - dLat2) > 0) {
              //得到 A点向左射线与边的交点的x坐标：
              dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - ALat)) / (dLat1 - dLat2);
              if (dLon < ALon)
                iSum++;
            }
          }
        }
        if (iSum % 2 != 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    mounted() {
//       this.fence = [{lat:30.527594345500283,lng:114.38690348974056},{lat:30.5281855437053,lng:114.39883570285247},{lat:30.525672926490586
// ,lng:114.4052739473373},{lat:30.520056253077477,lng:114.40905105076841},{lat:30.516360896170916
// ,lng:114.4053597905971},{lat:30.516065261549198,lng:114.40287033606297},{lat:30.51968672370905
// ,lng:114.39591703201931},{lat:30.52264291931643
// ,lng:114.39171071228924},{lat:30.52449049590728,lng:114.38870619819632}],
      (function (a, h, g, f, e, d, c, b) {
        b = function () {
          d = h.createElement(g);
          c = h.getElementsByTagName(g)[0];
          d.src = e;
          d.charset = "utf-8";
          d.async = 1;
          c.parentNode.insertBefore(d, c)
        };
        a["SeniverseWeatherWidgetObject"] = f;
        a[f] || (a[f] = function () {
          (a[f].q = a[f].q || []).push(arguments)
        });
        a[f].l = +new Date();
        if (a.attachEvent) {
          a.attachEvent("onload", b)
        } else {
          a.addEventListener("load", b, false)
        }
      }(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" +
        parseInt((new Date().getTime() / 100000000).toString(), 10)));
      window.SeniverseWeatherWidget('show', {
        flavor: "bubble",
        location: "WX4FBXXFKE4F",
        geolocation: true,
        language: "zh-Hans",
        unit: "c",
        theme: "auto",
        token: "0bfa26de-24ce-4fab-93e6-f2d2e9c057cb",
        hover: "enabled",
        container: "tp-weather-widget"
      })
      this.map = L.map(this.$el, {
        drawControl: true
      }).setView([31.87, 120.55], 15);
      L.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        attribution: 'created by zhouzhao'
      }).addTo(this.map);
      let drawnItems = new L.FeatureGroup();
      this.map.addLayer(drawnItems);
// zoom the map to the polygon
      L.marker(this.jc).addTo(this.map);
      // eslint-disable-next-line no-unused-lets
      let drawControl = new L.Control.Draw({
        draw: false,
        edit: {
          featureGroup: drawnItems
        }
      });
      this.map.addControl(drawControl)
      let self = this
      this.map.on(L.Draw.Event.CREATED, function (event) {
        let layer = event.layer;
        console.log(layer.layerType,layer)
        let bounds = layer._latlngs
        drawnItems.clearLayers()
        drawnItems.addLayer(layer);
        self.fence = bounds[0]
      });
      this.map.on('click', (e) => {
        // console.log('点击的', e)
        this.point = e
      });
      L.drawLocal = {
        draw: {
          toolbar: {
            actions: {
              title: '取消绘制',
              text: '取消'
            },
            finish: {
              title: '完成绘制',
              text: '完成'
            },
            undo: {
              title: '删除最后一个点',
              text: '删除最后一个点'
            },
            buttons: {
              polyline: '绘制线',
              polygon: '建立多边形地理围栏',
              rectangle: '建立矩形地理围栏',
              circle: '建立圆形地理围栏',
              circlemarker: '穿透查询'
            }
          },
          handlers: {
            circle: {
              tooltip: {
                start: '拖拽控制查询半径.'
              },
              radius: '半径'
            },
            circlemarker: {
              shapeOptions: {
                type: 1
              },
              tooltip: {
                start: '穿透查询'
              }
            },
            marker: {
              tooltip: {
                start: '此功能无效'
              }
            },
            polygon: {
              tooltip: {
                start: '点击开始绘制多边形',
                cont: '点击继续绘制多边形',
                end: '点击第一个点完成绘制'
              }
            },
            polyline: {
              error: '<strong>Error:</strong> shape edges cannot cross!',
              tooltip: {
                start: '点击开始绘制直线.',
                cont: '点击继续绘制直线',
                end: '双击最后一个点完成绘制直线'
              }
            },
            rectangle: {
              tooltip: {
                start: '点击拖拽绘制'
              }
            },

            simpleshape: {
              tooltip: {
                end: '释放鼠标完成绘制'
              }
            }
          }
        },
        edit: {
          toolbar: {
            actions: {
              save: {
                title: '保存改变',
                text: '保存改变'
              },
              cancel: {
                title: '取消改变',
                text: '取消'
              },
              clearAll: {
                title: '清除所有图层',
                text: '清除所有图层'
              }
            },
            buttons: {
              edit: '编辑图层',
              editDisabled: '没有可编辑的图层',
              remove: '删除图层',
              removeDisabled: '没有可以删除的图层'
            }
          },
          handlers: {
            edit: {
              tooltip: {
                text: '选择一个点开始编辑',
                subtext: '点击取消按钮取消编辑'
              }
            },
            remove: {
              tooltip: {}
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang='scss'>
   .mapContain{
     position: absolute;
     width: 750px;
   }
  .map {
    position: relative;
    width: 100%;
    height: calc(87vh);
    z-index: 100;
    }
  // .number{
  //   position: relative;
  //   bottom: 700px;
  //   left: 200px;
  //   z-index: 10000;
  // }
  .number[data-v-8a32e13e] {
    position: relative;
    z-index: 1000;}
   .number[data-v-8a32e13e] {
    top: -180vw;
    left: 26.667vw;
    content: "viewport-units-buggyfill; bottom: 93.333vw; left: 26.667vw";
}
   #tp-weather-widget{
     position: relative;
     z-index: 1000;
   }
  .sr-only {
    display: none;
  }
</style>