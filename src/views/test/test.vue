<template>
  <div>
    <h1 class="test"> {{ msg }} </h1>
    <hello-world></hello-world>

    <div class="wrap">
      <el-scrollbar wrap-class="list" wrap-style="color: red;" view-style="font-weight: bold;" view-class="view-box" :native="false">
        <div v-for="value in num" :key="value">
          {{value}}
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'test',
      num: 100
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/theme.less';

.test {
  color: @base-color;
}

.wrap {
  height: 300px;
  width: 500px;
  overflow: hidden;
  border: 1px solid #aaa;

  .list {
    max-height: 200px;
  }
}
</style>
