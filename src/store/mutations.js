export default {
  setUserName(state, userName = '') {
    state.userName = userName
  },

  setPermissionMenus(state, permissionMenus = []) {
    state.permissionMenus = permissionMenus
  }
}
