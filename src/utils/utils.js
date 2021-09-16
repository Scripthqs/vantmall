/**
 * 防抖
 * 说明：定义一个 const 常量保存本函数的返回值（返回值也是一个函数），并多次调用该返回值函数即可
 * @param {*} func 需要执行的函数，必填
 * @param {*} delay 防抖的延时，默认 100 毫秒
 * @returns 供使用的防抖函数，可为需要执行的函数添加可变参数项，使用...定义
 */
export function debounce (func, delay = 100) {
  // 初始化一个计时器，用于判断上一次调用的计时器是否已经计时结束
  let times = null

  // 返回函数形成闭包，使得 times 变量能够重复引用不被销毁
  return function (...args) {
    // 下次调用时如果存在上次的计时，则清空上次的计时并重置计时
    if (times) clearTimeout(times)
    // 设置延时执行函数，以期待下次调用在本次延时未结束时重新进入此处
    times = setTimeout(() => {
      // 延时结束时最终执行传入的函数
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + 3 + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
