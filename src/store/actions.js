import api from '@/api'

export default {
  // 获取用户名
  async fetchUserName({ commit }) {
    const result = await api.getCurrentUserName()
    if (result && result.userName) {
      commit('setUserName', result.userName)
    }
  },

  // 获取菜单权限
  async fetchPermissionMenusByRoles({ commit }) {
    const { menuList = [] } = await api.getPermissionMenusByRoles({ name: 'test' })
    if (menuList.lenght > 0) {
      commit('setPermissionMenus', menuList)
    }
  }
}
