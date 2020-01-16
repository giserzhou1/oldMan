import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '_leaflet-draw@1.0.4@leaflet-draw/dist/leaflet.draw.css'
import 'normalize.css'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import { Chart } from 'mand-mobile'

Vue.component(Chart.name, Chart)

Vue.config.productionTip = false
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
Vue.use(ElementUI)
Vue.use(Message)
Vue.use(mandMobile)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
