<template>
  <div class="cart-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #title>
        购物车 ({{ cartLength }})
      </template>
    </van-nav-bar>
    <!-- {{isAllChecked}} -->
    <!-- {{cartLength}} -->
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 提交订单 -->
    <van-submit-bar :price="cartTotal * 100" :button-text="`结算 (${cartChecked.length})`" @submit="onSubmit">
      <van-checkbox :value="selectAll" @click="selectAllClick">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickLink">点击修改地址</span>
      </template>
    </van-submit-bar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartList from './childComps/CartList.vue'

import { Toast } from 'vant'

export default {
  name: 'Cart',
  data () {
    return {
      addressShow: false
    }
  },
  components: { CartList },
  computed: {
    ...mapGetters(['cartLength', 'cartChecked', 'cartTotal', 'selectAll'])
  },
  methods: {
    selectAllClick () {
      this.$store.dispatch('allCheckClick')
    },
    onClickLink () {
      Toast('修改地址开发中')
      // this.addressShow = true
    },
    onSubmit () {
      Toast('结算开发中')
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
