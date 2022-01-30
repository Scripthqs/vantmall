<template>
  <div class="cate-container">
    <!-- 导航栏 -->
    <van-nav-bar title="分类" fixed />

    <van-row class="content">

      <van-col span="6" class="content-left">
        <!-- 侧边栏 -->
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item v-for=" (item,index) in categories" :key="index" :title="item.title" />
        </van-sidebar>
      </van-col>

      <!-- 内容区 -->
      <van-col span="18" class="content-right">
        <!-- 内容区 -->
        <tab-content-category :showDetailCategory="showDetailCategory" />

        <!-- 标签页 -->
        <van-tabs @click="tabClick" offset-top="36px" sticky>
          <van-tab title="流行">
            <product-grid :productList="showDetails.pop" />
          </van-tab>
          <van-tab title="新款">
            <product-grid :productList="showDetails.new" />
          </van-tab>
          <van-tab title="精选">
            <product-grid :productList="showDetails.sell" />
          </van-tab>
        </van-tabs>
      </van-col>

    </van-row>

  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '@/network/category'
// import { Notify } from 'vant'
import TabContentCategory from './childComps/TabContentCategory.vue'
import ProductGrid from '@/components/productGrid/ProductGrid.vue'

export default {

  name: 'Category',
  components: { TabContentCategory, ProductGrid },
  data () {
    return {
      activeKey: 0,
      categories: [],
      categoryData: [],
      menuIndex: 0,
      loading: false,
      finished: false,
      scroll: []
    }
  },
  created () {
    this._getCategory()
  },

  methods: {
    _getCategory () {
      getCategory().then((res) => {
        this.categories = res.data.category.list
        // console.log(this.categories)
        for (const index in this.categories) {
          // console.log(index)
          this.categoryData[index] = {
            subcategories: [],
            categoryDetail: {
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
      // Notify({ type: 'primary', message: index })
      this.menuIndex = index
      this._getCategoryDetail(index, 'pop')
      this._getCategoryDetail(index, 'new')
      this._getCategoryDetail(index, 'sell')
      // this.$refs.tabControl.currentIndex =
      //   this.categoryData[this.menuIndex].categoryDetail.currentTypeIndex
    },
    tabClick (index, title) {
      console.log(index, title)
      // this.categoryData[this.menuIndex].categoryDetail.currentTypeIndex = index
    }

  },
  computed: {
    showDetailCategory () {
      if (!this.categories[this.menuIndex]) {
        return []
      }
      // console.log(this.categoryData[this.menuIndex].subcategories)
      return this.categoryData[this.menuIndex].subcategories
    },
    showDetails () {
      if (!this.categoryData[this.menuIndex]) {
        return []
      }
      // console.log(this.categoryData[this.menuIndex].categoryDetail)
      // console.log(this.categoryData[this.menuIndex].categoryDetail.new)
      return this.categoryData[this.menuIndex].categoryDetail
    }
  }
}
</script>

<style lang="less" scoped>
.cate-container {
  padding: 46px 0 50px 0;
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
  // overflow: hidden;
  display: flex;
  /* border: 1px solid red; */
}
.content-left {
  overflow: auto;
}
.content-right {
  overflow: auto;
}
</style>
