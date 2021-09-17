<template>
  <van-swipe-cell>
    <template #default>
      <van-cell>
        <template #icon>
          <van-checkbox v-model="product.checked" />
        </template>
        <van-card :num="product.count" :price="product.newPrice" :desc="product.desc" :title="product.title" :thumb="product.imgURL" />
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
    }
  },
  methods: {
    deleteProductClick (iid) {
      this.$emit('deleteProductClick', iid)
    }
  }
}
</script>

<style scoped>
</style>
