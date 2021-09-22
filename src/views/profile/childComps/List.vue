<template>
  <div class="list">
    <div>
      <img src="@/assets/img/profile/表.png" alt="" />
      <span>我的消息</span>
    </div>
    <div>
      <img src="@/assets/img/profile/商城.png" alt="" />
      <span>积分商城</span>
    </div>
    <div>
      <img src="@/assets/img/profile/会员.png" alt="" />
      <span>会员卡</span>
    </div>
    <div>
      <img src="@/assets/img/profile/车.png" alt="" />
      <span>我的购物车</span>
    </div>
    <div>
      <img src="@/assets/img/profile/app.png" alt="" />
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List'
}
</script>

<style>
.list div {
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  border: 1px #ddd solid;
}
.list div img {
  width: 18px;
  margin: 0 15px;
  vertical-align: middle;
}
</style>
