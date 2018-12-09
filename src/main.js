// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui'
import './common/css/reset.less'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from '@/router'
import store from '@/store'

import component from '@/components'
import api from '@/api'
import * as utils from '@/common/js/utils'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(component)

Vue.prototype.$api = api
Vue.prototype.$utils = utils

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
