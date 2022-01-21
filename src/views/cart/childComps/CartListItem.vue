<template>
  <van-swipe-cell>
    <template #default>
      <van-cell>
        <template #icon>
          <van-checkbox v-model="product.checked" />
        </template>
        <van-card :num="product.count" :price="product.newPrice" :desc="product.desc" :title="product.title" :thumb="product.imgURL">
          <template #footer>
            <van-button size="small" @click="decreaseCount">-</van-button>
            <van-button size="small" @click="increaseCount">+</van-button>
          </template>
        </van-card>
      </van-cell>
    </template>
    <template #right>
      <van-button square text="删除" type="danger" style="height: 100%;" @click="deleteProductClick(product.iid)" />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    },
    itemIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    deleteProductClick (iid) {
      this.$emit('deleteProductClick', iid)
    },
    decreaseCount () {
      if (this.product.count > 1) {
        this.product.count--
      }
    },
    increaseCount () {
      this.product.count++
    }
  }
}
</script>

<style scoped>
</style>
