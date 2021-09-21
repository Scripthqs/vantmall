<template>
  <div class="cate-container">
    <van-nav-bar title="分类" fixed />

    <div class="content">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="onChange" class="menu-left">
        <van-sidebar-item v-for=" (item,index) in categories" :key="index" :title="item.title" />
      </van-sidebar>

      <!-- 内容区 -->
      <van-list class="content-right" v-model="loading" :finished="finished" finished-text="没有更多了">
        <tab-content-category :showDetailCategory="showDetailCategory" />
      </van-list>
    </div>

  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '@/network/category'
import { Notify } from 'vant'
import TabContentCategory from './childComps/TabContentCategory.vue'

export default {

  name: 'Category',
  components: { TabContentCategory },
  data () {
    return {
      activeKey: 0,
      categories: [],
      categoryData: [],
      menuIndex: 0,
      loading: false,
      finished: false
    }
  },
  created () {
    this._getCategory()
  },
  methods: {
    _getCategory () {
      getCategory().then((res) => {
        this.categories = res.data.category.list
        console.log(this.categories)
        for (const index in this.categories) {
          // console.log(index)
          this.categories[index].saveY = 0
          this.categoryData[index] = {
            subcategories: [],
            categoryDetail: {
              currentTypeIndex: 0,
              pop: [],
              new: [],
              sell: []
            }
          }
          this._getSubcategory(index)
        }

        // 请求下来第一页的pop，new，sell
        this._getCategoryDetail(0, 'pop')
        this._getCategoryDetail(0, 'new')
        this._getCategoryDetail(0, 'sell')
      })
    },
    _getSubcategory (index) {
      getSubcategory(this.categories[index].maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data.list
      })
    },
    _getCategoryDetail (index, type) {
      getCategoryDetail(this.categories[index].miniWallkey, type).then(
        (res) => {
          this.categoryData[index].categoryDetail[type] = res
          this.categoryData = { ...this.categoryData }
        }
      )
    },
    onChange (index) {
      Notify({ type: 'primary', message: index })
      // this.menuIndex = index
    }

  },
  computed: {
    showDetailCategory () {
      if (!this.categories[this.menuIndex]) {
        return []
      }
      return this.categoryData[this.menuIndex].subcategories
    },
    showDetails () {
      if (!this.categoryData[this.menuIndex]) {
        return []
      }
      return this.categoryData[this.menuIndex].categoryDetail[this.currentTab]
    }
  }
}
</script>

<style lang="less" scoped>
.cate-container {
  padding: 46px 0 50px 0;
  // position: relative;
}
.van-nav-bar {
  background-color: #fd6020;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  display: flex;
}
.menu-left {
  padding: 5px 0;
  height: 100%;
}
.content-right {
  height: 100%;
  margin: 5px;
  flex: 1;
}
</style>
