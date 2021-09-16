// 封装了一个回到顶部的按钮
<template>

  <van-icon name="back-top" size="35" class="backTop" />

</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
.backTop {
  position: fixed;
  z-index: 1;
  bottom: 60px;
  right: 25px;
  /* border: 1px solid black; */
  border-radius: 50%;
  /* background-color: #fff; */
}
</style>
