<template>
  <div>
    <van-image :src="showImage" fit="cover" width="100%" />
    <div>
      <p class="van-ellipsis1">{{ productItem.title }}</p>
      <span style="color: 'red';font-size: 18px;">￥{{ productItem.price }}</span> 已售{{ productItem.sale }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showImage () {
      if (this.productItem.show) {
        return this.productItem.show.img
      } else if (this.productItem.image) {
        return this.productItem.image
      } else {
        return this.productItem.img
      }
    }
  }

}
</script>

<style scoped>
.van-ellipsis1 {
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  /* width: 100px; */
}
</style>
