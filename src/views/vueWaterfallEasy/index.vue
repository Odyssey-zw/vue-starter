<template>
  <div class="vue-waterfall-easy-demo">
    <div class="content">
      <vue-waterfall-easy
        ref="waterfall"
        :maxCols="3"
        :imgsArr="imgsArr"
        :enablePullDownEvent="true"
        @scrollReachBottom="getSearchData"
        @click="handleClickImgCard">

        <!-- 头部标题 -->
        <div slot="waterfall-head" class="head-title">为您找到相关结果约23,500,000个 <el-button size="mini" @click="test">click</el-button></div>

        <!-- 加载图标样式 -->
        <div slot="loading" slot-scope="{isFirstLoad}">
          <div slot="loading" v-if="isFirstLoad">
            <i style="font-size:40px;" class="el-icon-loading"></i></div>
          <div v-else><i class="el-icon-loading"></i></div>
        </div>

        <!-- 卡片内容 -->
        <div class="search-card-info" slot-scope="item">

          <!-- 标题-描述-图片 -->
          <div class="card-box">
            <p class="title">{{item.value.title}}</p>
            <p class="description">{{item.value.info}}</p>
            <p class="imgWrap" v-html="item.value.image&&item.value.image.outerHTML"></p>
          </div>

        </div>

        <div slot="waterfall-over">waterfall-over</div>
      </vue-waterfall-easy>
    </div>

    <!-- 详情页 -->
    <iframe-detail-dialog :visible.sync="iframeDetailDialogVisiable"
                          :detailInfo.sync="iframeDetailInfo"
                          :favoriteList="favoriteList"></iframe-detail-dialog>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'

import IframeDetailDialog from './iframeDetailDialog'

import img1 from './imgs/1.jpg'
import img2 from './imgs/2.jpg'
import img3 from './imgs/3.jpg'
import img4 from './imgs/4.jpg'
import img5 from './imgs/5.jpg'
import img6 from './imgs/6.jpg'
import img7 from './imgs/7.jpg'
import img8 from './imgs/8.jpg'
import img9 from './imgs/9.jpg'
import img10 from './imgs/10.jpg'

const imgsArr = [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10 ]
const getRandomImg = () => (imgsArr[Math.floor(Math.random() * imgsArr.length)])
console.log(getRandomImg)

const mockSearchData = [
  {
    type: 'title-desc',
    link: 'https://baike.baidu.com/item/%E6%9B%B9%E4%B8%95/5980',
    title: '曹丕为政举措政治改革官制',
    info: '在即位魏王之初，曹丕便出台两项新政：第一项新政是废除中常侍和小黄门，改设散骑常侍，散骑侍郎两种官职，定员各四人，同时又宣布：严禁宦人干政、宦人为官，最高只能充任”诸署令“，从制度上铲除宦官干政的根源。为了传之久远，他还依照”国有大事则镂于金版“的古训，命人把上述政令镌刻在金属的简策上，然后珍藏于石室之中。',
    imgSrc: getRandomImg()
  },
  {
    type: 'title-desc-img',
    link: 'https://baike.baidu.com/item/%E5%8F%B8%E9%A9%AC%E7%82%8E',
    title: '司马炎晋宣帝司马懿之孙、晋景帝司马师之侄',
    info: '司马炎在位期间，封同姓诸王, 并严禁私募佃客。又招募原吴、蜀地区人民北来，充实北方，并废屯田制，使屯田民成为州郡编户。太康元年（280年），颁行户调式，包括占田制、户调制和品官占田荫客制。',
    imgSrc: getRandomImg()
  },
  {
    type: 'title-desc',
    link: 'https://baike.baidu.com/item/%E5%8F%B8%E9%9A%B6%E6%A0%A1%E5%B0%89',
    title: '司隶校尉',
    info: '在即位魏王之初，曹丕便出台两项新政：第一项新政是废除中常侍和小黄门，改设散骑常侍，散骑侍郎两种官职，定员各四人，同时又宣布：严禁宦人干政、宦人为官，最高只能充任”诸署令“，从制度上铲除宦官干政的根源。为了传之久远，他还依照”国有大事则镂于金版“的古训，命人把上述政令镌刻在金属的简策上，然后珍藏于石室之中。'
  },
  {
    type: 'title-desc-img',
    link: 'http://www.baidu.com',
    title: '八王之乱 （历史事件）',
    info: '其核心人物有汝南王司马亮、楚王司马玮、赵王司马伦、齐王司马冏、长沙王司马乂、成都王司马颖、河间王司马颙、东海王司马越八王。',
    imgSrc: getRandomImg()
  },
  {
    type: 'title-desc',
    link: 'https://baike.baidu.com/item/%E6%9B%B9%E4%B8%95/5980',
    title: '曹丕为政举措政治改革官制',
    info: '在即位魏王之初，曹丕便出台两项新政：第一项新政是废除中常侍和小黄门，改设散骑常侍，散骑侍郎两种官职，定员各四人，同时又宣布：严禁宦人干政、宦人为官，最高只能充任”诸署令“，从制度上铲除宦官干政的根源。为了传之久远，他还依照”国有大事则镂于金版“的古训，命人把上述政令镌刻在金属的简策上，然后珍藏于石室之中。'
  },
  {
    type: 'title-desc',
    link: 'https://baike.baidu.com/item/%E6%9B%B9%E4%B8%95/5980',
    title: '曹丕为政举措政治改革官制',
    info: '在即位魏王之初，曹丕便出台两项新政：第一项新政是废除中常侍和小黄门，改设散骑常侍，散骑侍郎两种官职，定员各四人，同时又宣布：严禁宦人干政、宦人为官，最高只能充任”诸署令“，从制度上铲除宦官干政的根源。为了传之久远，他还依照”国有大事则镂于金版“的古训，命人把上述政令镌刻在金属的简策上，然后珍藏于石室之中。'
  },
  {
    type: 'title-desc-img',
    link: 'http://www.baidu.com',
    title: '八王之乱 （历史事件）',
    info: '其核心人物有汝南王司马亮、楚王司马玮、赵王司马伦、齐王司马冏、长沙王司马乂、成都王司马颖、河间王司马颙、东海王司马越八王。',
    imgSrc: getRandomImg()
  },
  {
    type: 'title-desc',
    link: 'https://baike.baidu.com/item/%E5%8F%B8%E7%A9%BA/4605?fromtitle=%E5%A4%A7%E5%8F%B8%E7%A9%BA&fromid=895649',
    title: '大司空',
    info: '司空是中国古代官名。西周始置，位次三公，与六卿相当，与司马、司寇、司士、司徒并称五官，掌水利、营建之事，金文皆作司工。春秋、战国时沿置。'
  }
]

const mockFavoriteData = [
  { title: '大司空' },
  { title: '司隶校尉' }
]

export default {
  name: 'vue-waterfall-easy-demo',
  components: { vueWaterfallEasy, IframeDetailDialog },
  data() {
    return {
      imgsArr: [],
      iframeDetailDialogVisiable: false,
      iframeDetailInfo: {},

      favoriteList: [], // 收藏夹列表
      time: 1000
    }
  },
  mounted() {
    this.getSearchData()
    this.getFavoriteData()
  },
  methods: {
    // 获取搜索数据
    async getSearchData() {
      await this.$utils.sleep(this.time)
      const loadImgResult = await this.preLoadImg(mockSearchData)
      this.imgsArr = this.imgsArr.concat(loadImgResult)
    },

    // 获取收藏列表
    async getFavoriteData() {
      await this.$utils.sleep(this.time)
      this.favoriteList = mockFavoriteData.concat()
    },

    async test() {
      // const result = await this.preLoadImg(this.imgs)
      // this.imgsArr = this.imgsArr.concat(result)
    },

    // 预加载数组对象中图像
    async preLoadImg(list = []) {
      const dataList = list.concat()
      const preLoad = imgSrc => {
        return new Promise(resolve => {
          const img = new Image()
          img.onload = () => {
            resolve({ loaded: true, imgSrc, image: img })
          }
          img.src = imgSrc
        })
      }

      const resultAll = await Promise.all(
        dataList
          .filter(data => (data.imgSrc && data.imgSrc !== ''))
          .map(data => preLoad(data.imgSrc))
      )

      resultAll.forEach(result => {
        if (result.loaded) {
          const target = dataList.find(data => data.imgSrc === result.imgSrc)
          if (target) {
            target['image'] = result.image
          }
        }
      })
      return dataList
    },

    // 点击图片
    handleClickImgCard(event, { index, value }) {
      event.preventDefault()
      console.log('img clicked', index, value)

      this.iframeDetailInfo = { ...value, src: value.link }
      this.iframeDetailDialogVisiable = true

      // if (event.target.tagName.toLowerCase() === 'img') {
      //   console.log('img clicked', index, value)
      // }
    }
  }
}
</script>

<style lang="less">
@import '../../common/css/default.less';

.vue-waterfall-easy-demo {
  position: relative;
  height: 600px;
  width: 830px;

  border: 1px solid #aaa;
  margin: 20px;

  .head-title {
    font-size: 12px;
    color: #999;
    padding: 10px 0 0 15px;
  }

  .content {
    .scrollbar;
    position: absolute;
    width: 100%;
    height: 100%; // 父元素必须要有高度
  }

  .search-card-info {
    .card-box {
      padding: 8px;
      p {
        width: 100%;
        box-sizing: border-box;
      }
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-bottom: 5px;
      font-weight: 600;
      border-bottom: 1px solid #eee;
    }
    .description {
      font-size: 12px;
      line-height: 20px;
      padding-top: 5px;
    }
    .imgWrap {
      border: 1px solid #eee;
    }
  }
}
</style>
