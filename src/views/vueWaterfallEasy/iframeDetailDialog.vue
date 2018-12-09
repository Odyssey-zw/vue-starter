<template>
  <el-dialog class="iframe-detail-dialog"
             ref="dialog"
             fullscreen
             title="详情"
             :close-on-click-modal="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose">
    <!-- 添加收藏 -->
    <div class="favorite-wrap">
      <span :class="[isFavorite ? 'favorite' : '']"
            @click="addInFavoriteHandle">
        <i class="el-icon-star-on"></i>{{isFavorite ? '已收藏' : '未收藏'}}</span>
    </div>
    <!-- 内容详情 -->
    <div class="iframe-wrap">
      <iframe ref="iframe"
              :src="iframeDetail.src"
              :height="iframeHeight"
              :width="iframeWidth"
              frameborder="0"
              @load="onload"></iframe>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'iframe-detail-dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailInfo: {
      type: Object,
      default: () => ({})
    },
    favoriteList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      iframeHeight: '100%',
      iframeWidth: '100%',
      isFavorite: false
    }
  },

  watch: {
    detailInfo: {
      deep: true,
      handler(val) {
        if (val) {
          this.isFavorite = this.favoriteList.some(data => data.title === val.title)
        }
      }
    }
  },

  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    iframeDetail: {
      get() {
        return this.detailInfo
      },
      set(val) {
        this.$emit('update:detailInfo', val)
      }
    }
  },

  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },

  methods: {
    handleClose() {
      this.dialogVisible = false
      this.iframeDetail = {}
    },

    // 添加进收藏夹
    addInFavoriteHandle() {
      console.log('添加进收藏夹======', this.detailInfo)

      this.detailInfo.favorite = true
    },

    onload() {
      let iframe = this.$refs.iframe
      if (iframe) {
        let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow
        if (iframeWin.document.body) {
          iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
        }
      }
    },

    resize() {
      const that = this
      this.$utils.throttle(this, () => {
        console.log(that)
        // that.wi
      })
    }
  }
}
</script>

<style lang="less">
.iframe-detail-dialog {
  .el-dialog {
    margin: 50px;
    width: calc(100% - 100px);
    height: calc(100% - 100px);

    .el-dialog__body {
      padding-top: 0;
      height: 85%;

      .favorite-wrap {
        padding-bottom: 5px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        text-align: right;
        span {
          cursor: pointer;
        }
        .favorite{
          i {
            color: red;
          }
        }
      }

      .iframe-wrap {
        height: 100%;
      }
    }
  }
}
</style>
