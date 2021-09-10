<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="购物街" fixed />

    <!-- 提示区 -->
    <van-notice-bar left-icon="volume-o" scrollable text="使用vant-ui组件库重构的版本，功能还在开发测试中，尽请期待！" />

    <!-- 轮播图 -->
    <van-swipe :autoplay="2000" indicator-color="#f00">
      <van-swipe-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="轮播图" />
        </a>
      </van-swipe-item>
    </van-swipe>

    <!-- 预览区 -->
    <recommend-view :recommends="recommends"></recommend-view>

    <!-- 推荐区 -->
    <feature-view />

    <!-- 标签页 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-tabs @click="tabClick" offset-top="36px" sticky>
        <van-tab title="流行">
          <product-grid :productList="goods.pop.list" />
        </van-tab>
        <van-tab title="新款">
          <product-grid :productList="goods.new.list" />
        </van-tab>
        <van-tab title="精选">
          <product-grid :productList="goods.sell.list" />
        </van-tab>
      </van-tabs>

    </van-list>
  </div>
</template>

<script>

import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import ProductGrid from '@/components/productGrid/ProductGrid.vue'

import { getHomeMultidata, getHomeGoods } from '@/network/home.js'
export default {
  name: 'Home',
  components: {
    RecommendView,
    FeatureView,
    ProductGrid
  },
  data () {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: { page: 4, list: [] },
        new: { page: 4, list: [] },
        sell: { page: 4, list: [] }
      },
      currentType: 'pop',
      // list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getHmMultidata()
    this.getHmGoods('pop')
    this.getHmGoods('new')
    this.getHmGoods('sell')
  },
  methods: {
    tabClick (index, title) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(index, title)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.getHmGoods(this.currentType)

      // // 加载状态结束
      this.loading = false

      // // 数据全部加载完成
      if (this.goods[this.currentType].list.length >= 100) {
        this.finished = true
      }
    },

    // 网络请求相关
    async getHmMultidata () {
      // 1.请求多个数据,轮播图相关
      const { data: res } = await getHomeMultidata()
      // console.log(res)
      this.banners = res.banner.list
      // console.log(this.banners)
      this.recommends = res.recommend.list
    },
    async getHmGoods (type) {
      const page = this.goods[type].page + 1
      const { data: res } = await getHomeGoods(type, page)
      // console.log(res)
      this.goods[type].list.push(...res.list)
      this.goods[type].page += 1
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
}
.van-nav-bar {
  background-color: #fd6020;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  width: 100%;
}
/deep/.van-swipe__indicator {
  width: 10px;
  height: 10px;
  background-color: #fff;
  opacity: 1;
}
// /deep/.van-tabs__wrap {
//   position: sticky;
//   top: 44px;
// }
</style>
