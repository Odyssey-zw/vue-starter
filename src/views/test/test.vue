<template>
  <div>
    <h1 class="test"></h1>{{ msg }}</h1>
    <hello-world></hello-world>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'test'
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/theme.less';

.test {
  color: @base-color;
}
</style>