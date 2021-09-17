export default {
  // 购物车商品列表长度
  cartLength (state) {
    return state.cartList.length
  },
  // 购物车商品列表
  cartList (state) {
    return state.cartList
  },
  // 已选的购物车商品列表
  cartChecked (state) {
    return state.cartList.filter(item => item.checked)
  },
  // 已选的购物车商品总额
  cartTotal (state) {
    // console.log(cartChecked)
    return state.cartList.filter((item) => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.newPrice * item.count
    }, 0)
  }
}
