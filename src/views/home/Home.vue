<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="购物街" fixed />

    <!-- 提示区 -->
    <van-notice-bar left-icon="volume-o" scrollable text="使用vant-ui组件库重构的版本，功能还在开发测试中，尽请期待！" />

    <!-- 轮播图 -->
    <van-swipe :autoplay="2000" indicator-color="#f00" touchable>
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

    <!-- 点击回到顶部  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import ProductGrid from '@/components/productGrid/ProductGrid.vue'
import BackTop from '@/components/backTop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from '@/network/home.js'

export default {
  name: 'Home',
  components: {
    RecommendView,
    FeatureView,
    ProductGrid,
    BackTop
  },
  data () {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      // list: [],
      loading: false,
      finished: false,
      isShowBackTop: false
    }
  },
  created () {
    this.getHmMultidata()
    this.getHmGoods('pop')
    this.getHmGoods('new')
    this.getHmGoods('sell')
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    /*
     *1.点击切换tab栏的方法
     */
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

    /*
     *2.下拉加载更多数据方法
     */
    onLoad () {
      // 异步更新数据
      this.getHmGoods(this.currentType)

      // // 加载状态结束
      this.loading = false

      // // 数据全部加载完成
      if (this.goods[this.currentType].list.length >= 100) {
        this.finished = true
      }
    },
    /*
     *3.点击回到顶部的方法
     */
    backClick () {
      // 获取滚动的高度
      let top = document.documentElement.scrollTop || document.body.scrollTop
      console.log(top)
      if (top >= 700) {
        this.isShowBackTop = true
      }
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 100
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    scrollToTop () {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(2)
      if (top >= 700) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
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
/deep/.van-icon van-icon-back-top {
  position: fixed;
  z-index: 1;
  bottom: 60px;
  right: 25px;
}
</style>
