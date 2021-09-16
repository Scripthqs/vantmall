<template>
  <div class="cart-container">
    <!-- 导航栏 -->
    <van-nav-bar title="购物车" fixed />

    <!-- 商品列表 -->
    <van-card :num="cartLength" price="2.00" desc="描述信息" title="商品标题" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" />

    <!-- 提交订单 -->
    <van-submit-bar :price="3050" button-text="提交订单">
      <van-checkbox>全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
  }
}
</script>

<style lang="less" scoped>
.cart-container {
  padding: 46px 0 50px 0;
}
.van-nav-bar {
  background-color: #fd6020;
}

/deep/.van-nav-bar__title {
  color: #fff;
}
.van-submit-bar {
  bottom: 50px;
}
</style>
