<template>
  <div class="content-category">
    <a :href="item.link" class="content-category-item" v-for="(item, index) in showDetailCategory" :key="index">
      <img :src="item.image" alt="图片" />
      <span>{{ item.title }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'TabContentCategory',
  props: {
    showDetailCategory: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.content-category {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-between;
}
.content-category-item {
  display: block;
  width: 65px;
  text-align: center;
  font-size: 12px;
  margin: 3px;
}
.content-category-item img {
  width: 70%;
  display: block;
  margin: 0 auto;
}
.content-category-item span {
  display: inline-block;
  margin: 5px 0;
}
</style>
