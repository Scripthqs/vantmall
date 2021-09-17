export default {
  addCart (context, payload) {
    return new Promise((resolve, reject) => {
      let flag = false
      for (let i = 0; i < context.state.cartList.length; i++) {
        if (context.state.cartList[i].iid === payload.iid) {
          flag = true
          context.commit('addCounter', i)
          resolve('已存在商品，数量+1')
          break
        }
      }
      if (!flag) {
        context.commit('addGoods', payload)
        resolve('添加至购物车成功！')
      }
    })
  },
  deleteCart (context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('deleteCart', payload)
      resolve('已移除该商品！')
    })
  },
  clickCheck (context, payload) {
    context.commit('changeChecked', payload)
  },
  allCheckClick (context) {
    context.commit('changeAllChecked')
  }
}
