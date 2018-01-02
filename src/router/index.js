import Vue from 'vue'
import Router from 'vue-router'

import testRoutes from './test'

Vue.use(Router)

export default new Router({
  routes: [...testRoutes]
})
