<template>
  <div class="cart-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #title>
        购物车 ({{ cartLength }})
      </template>
    </van-nav-bar>

    <!-- 商品列表 -->

    <cart-list></cart-list>
    <!-- 提交订单 -->

    <van-submit-bar :price="cartTotal * 100" :button-text="`结算 (${cartChecked.length})`">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartList from './childComps/CartList.vue'

export default {
  name: 'Cart',
  data () {
    return {
      // checked: true
    }
  },
  components: { CartList },
  computed: {
    ...mapGetters(['cartLength', 'cartList', 'cartChecked', 'cartTotal'])
  },
  methods: {
    allCheckClick () {
      this.$store.dispatch('allCheckClick')
    }
  }
}
</script>

<style lang="less" scoped>
.cart-container {
  padding: 46px 0 120px 0;
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
