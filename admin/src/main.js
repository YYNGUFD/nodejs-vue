import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './style/base.css'


Vue.config.productionTip = false

import http from './axios/https.js'
Vue.prototype.$http = http
 
//顶一个
Vue.mixin({
  methods:{
    getAuthHeaders(){
       return {
         Authorization:`Bearer ${localStorage.token}`
       }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
