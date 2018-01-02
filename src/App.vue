<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  mounted() {
    this.fetchUserName()
    this.fetchPermissionMenusByRoles()
  },
  methods: {
    ...mapActions(['fetchUserName', 'fetchPermissionMenusByRoles'])
  }
}
</script>

<style lang="less">
@import 'common/css/theme.less';
@import 'common/css/default.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
