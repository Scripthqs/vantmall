<template>
  <div class="cate-container ">
    <!-- 导航栏 -->
    <van-nav-bar title="分类" fixed />

    <login></login>

    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list></list>

  </div>
</template>

<script>
// import NavBar from "components/common/navbar/NavBar";
import Login from './childComps/Login.vue'
import List from './childComps/List.vue'

export default {
  name: 'Profile',
  components: {
    // NavBar,
    Login,
    List
  }
}
</script>

<style lang='less' scoped>
.cate-container {
  padding: 46px 0 50px 0;
}
.van-nav-bar {
  background-color: #fd6020;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
  margin-top: 6px;
}
</style>
