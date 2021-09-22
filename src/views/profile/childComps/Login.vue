<template>
  <div class="login">
    <img src="@/assets/img/profile/头像.png" alt="" />
    <span>登录</span>/
    <span>注册</span>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
.login {
  background-color: #eee;
  height: 90px;
  line-height: 90px;
  /* text-align: center; */
}
.login img {
  /* float: left; */
  width: 60px;
  border: 1px black solid;
  border-radius: 50%;
  /* line-height: 90px; */
  /* text-align: center; */
  vertical-align: middle;
  margin-right: 20px;
}
.login span {
  left: right;
}
</style>