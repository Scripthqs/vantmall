<template>
  <div>
    <cart-list-item v-for="(product,index) in cartList" :key="index" :product="product" @deleteProductClick="deleteProductClick" />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Toast } from 'vant'

import CartListItem from './CartListItem'

export default {
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])

  },
  methods: {
    ...mapActions(['deleteCart']),

    deleteProductClick (iid) {
      this.deleteCart(iid).then((res) => {
        Toast(res)
      })
    }
  }
}
</script>

<style scoped>
</style>
