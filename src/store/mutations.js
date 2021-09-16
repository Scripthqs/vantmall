export default {
  addCounter (state, payload) {
    state.cartList[payload].count++
  },
  addGoods (state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  changeChecked (state, payload) {
    state.cartList[payload].checked = !state.cartList[payload].checked
  },
  changeAllChecked (state) {
    if (state.cartList.length !== 0) {
      if (state.cartList.find(item => !item.checked)) {
        for (const item of state.cartList) { item.checked = true }
      } else {
        for (const item of state.cartList) { item.checked = false }
      }
    }
  }

}
