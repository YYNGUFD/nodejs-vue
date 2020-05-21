import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import  './style/css.less';

import vueSwiper from 'vue-awesome-swiper'
import './assets/iconfont/iconfont.css'

import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper)

import MCard from './components/Card.vue'
Vue.component('m-card',MCard)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard);
Vue.config.productionTip = false

Vue.prototype.$http=axios.create({
  baseURL:process.env.VUE_APP_API_URL|| "/web/rest",
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
