<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <van-tabbar route v-if="!isDetail">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isDetail: false
    }
  },
  updated () {
    if (this.$route.path.indexOf('/detail') !== -1) {
      this.isDetail = true
    } else {
      this.isDetail = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
