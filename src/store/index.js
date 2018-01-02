import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// mudules

Vue.use(Vuex)

let plugins
if (process.env.NODE_ENV !== 'production') {
  plugins = [logger()]
} else {
  plugins = []
}

const state = {
  userName: '',
  permissionMenus: []
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  plugins
})
