<template>
  <div class="detail-container">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" @click-right="onClickRight" fixed>
      <template #title>
        <van-tabs v-model="active" @click="onTabClick">
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
    <detail-base-info :goods="goods" id="商品"></detail-base-info>

    <!-- 商家信息 -->
    <detail-shop-info :shop="shop"></detail-shop-info>

    <!-- 商品细节 -->
    <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>

    <!-- 评论信息  -->
    <van-cell id="评价" icon="comment-o">
      <template #title>用户评价</template>
    </van-cell>
    <detail-comment-info :commentInfo="commentInfo" />

    <!-- 商品参数 -->
    <van-cell id="参数" icon="comment-o">
      <template #title>商品参数</template>
    </van-cell>
    <detail-param-info :paramInfo="paramInfo"></detail-param-info>

    <!-- 推荐商品 -->
    <van-cell id="推荐" icon="comment-o">
      <template #title>相似商品</template>
    </van-cell>
    <product-grid :product-list="recommends" />

    <!-- 点击回到顶部  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartLength()" to="/cart" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickIcon" />
    </van-goods-action>

    <!-- 弹出：商品分享 -->
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />

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
import { CartGoods } from '@/network/cart'

import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import ProductGrid from '@/components/productGrid/ProductGrid.vue'
import BackTop from '@/components/backTop/BackTop.vue'

import { Toast } from 'vant'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    ProductGrid,
    BackTop
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
      recommends: [],
      isShowBackTop: false,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: 'QQ', icon: 'qq' },
          { name: '微博', icon: 'weibo' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '生成海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '微信小程序码', icon: 'weapp-qrcode' }
        ]
      ]
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
      // console.log(this.topImages)
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

    // 获取推荐信息
    getRecommend().then((res) => {
      console.log(res)
      res.data.list.forEach(recommendItem => {
        // recommendItem.iid = recommendItem.item_id
        recommendItem.show = {}
        recommendItem.show.img = recommendItem.image
      })
      this.recommends = res.data.list
      console.log(this.recommends)
    })
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    ...mapActions(['addCart']),
    ...mapGetters(['cartLength']),

    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.showShare = true
    },
    onTabClick (name, title) {
      console.log(name, title)
      // const currentScroll = Math.ceil(document.documentElement.scrollTop)
      // this.active = name
      // console.log(document.querySelector('#推荐').offsetTop - 46)
      switch (title) {
        case '商品':
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          break
        case '评价':
          document.documentElement.scrollTop = document.querySelector('#评价').offsetTop - 46
          document.body.scrollTop = document.querySelector('#评价').offsetTop - 46
          break
        case '参数':
          document.documentElement.scrollTop = document.querySelector('#参数').offsetTop - 46
          document.body.scrollTop = document.querySelector('#参数').offsetTop - 46
          break
        case '推荐':
          document.documentElement.scrollTop = document.querySelector('#推荐').offsetTop - 46
          document.body.scrollTop = document.querySelector('#推荐').offsetTop - 46
          break
      }
    },
    backClick () {
      // 获取滚动的高度
      let top = document.documentElement.scrollTop || document.body.scrollTop
      console.log(top)
      if (top >= 700) {
        this.isShowBackTop = true
      }
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 500
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
      // console.log(top)
      // console.log(document.querySelector('#评价').offsetTop - 46)
      // console.log(document.querySelector('#参数').offsetTop - 46)
      // console.log(document.querySelector('#推荐').offsetTop - 46)
      // console.log(document.querySelector('#商品').offsetTop - 46)

      if (top < document.querySelector('#评价').offsetTop - 48) {
        this.active = 0
      } else if (top < document.querySelector('#参数').offsetTop - 48) {
        this.active = 1
      } else if (top < document.querySelector('#推荐').offsetTop - 48) {
        this.active = 2
      } else {
        this.active = 3
      }
    },
    onSelect (option) {
      Toast(option.name)
      if (option.icon === 'link') {
        Toast.success('复制成功')
      }
      this.showShare = false
    },
    onClickIcon () {
      Toast('尚未开发！')
    },
    addToCart () {
      const product = new CartGoods(this.itemInfo)
      // this.$store.dispatch("addCart", product);
      console.log(product)
      // 由于通过mapActions将store中的方法映射了过来，因此可以直接调用改方法
      //  这是普通方法使用toast，若想要看以插件形式封装的toast使用，看Cart中相关的
      this.addCart(product).then((res) => {
        Toast(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-container {
  padding: 46px 0 50px 0;
}
.van-swipe {
  height: 300px;
  overflow: hidden;
  text-align: center;
}

.van-swipe-item img {
  width: 100%;
}
/deep/.van-tab {
  margin: 0 6px;
}
</style>
