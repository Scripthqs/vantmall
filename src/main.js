import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/css/base.css'

import FastClick from 'fastclick'

// 解决移动端300ms延迟问题
FastClick.attach(document.body)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
