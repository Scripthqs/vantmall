<template>
  <div>

    <!-- 导航栏 -->
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #title>
        <van-tabs v-model="active" @click="onClick">
          <van-tab title="商品"></van-tab>
          <van-tab title="评价"></van-tab>
          <van-tab title="参数"></van-tab>
          <van-tab title="推荐"></van-tab>
        </van-tabs>
      </template>
      <template #right>
        <van-icon name="share-o" size="24" />
      </template>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe :autoplay="2000" indicator-color="#f00">
      <van-swipe-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="轮播图" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品信息 -->
    <detail-base-info :goods="goods"></detail-base-info>

    <!-- 商家信息 -->
    <detail-shop-info :shop="shop"></detail-shop-info>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" to="/cart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from '@/network/detail'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'

export default {
  name: 'Detail',
  components: {
    DetailBaseInfo,
    DetailShopInfo
  },
  data () {
    return {
      active: 0,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      detailRefresh: null,
      themTopYs: [],
      getRealTopYs: null,
      currentIndex: 0,
      isShowBackTop: false,
      itemInfo: {},
      toastMessage: '',
      toastShow: false,
      timer: null
    }
  },
  created () {
    // 保存传入的iid数据
    this.iid = this.$route.params.iid
    // 发送网络请求请求详情页数据
    getDetail(this.iid).then((res) => {
      console.log(res)
      const data = res.result
      // 顶部图片轮播数据
      this.topImages = data.itemInfo.topImages
      console.log(this.topImages)
      // 取出并整合需要使用的数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      // 取出并整合店家信息
      this.shop = new Shop(data.shopInfo)

      // 图片详情相关信息
      this.detailInfo = data.detailInfo

      // detailParam相关信息整合
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )

      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      this.itemInfo = data.itemInfo
    })

    getRecommend().then((res) => {
      this.recommend = res.data.list
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {

    },
    onClick (name, title) {
      console.log(name, title)
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe {
  height: 300px;
  overflow: hidden;
  text-align: center;
}

.van-swipe-item img {
  width: 100%;
}
</style>
