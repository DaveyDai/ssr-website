import message from './vava-message.js'

// 邮箱校验
const validateEmail = value => {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value || '')
}

// 清楚左右空格
const trim = value => {
  return value.replace(/(^\s*)|(\s*$)/g, '')
}

const formatDate = (value, filter) => { // 格式化时间
  let o = {
    'M+' : value.getMonth() + 1,                     // 月份   
    'd+' : value.getDate(),                          // 日   
    'h+' : value.getHours(),                         // 小时   
    'm+' : value.getMinutes(),                       // 分   
    's+' : value.getSeconds(),                       // 秒   
    'q+' : Math.floor((value.getMonth() + 3) / 3),   // 季度   
    'S'  : value.getMilliseconds()                   // 毫秒   
  }
  if (/(y+)/.test(filter)) filter = filter.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) 
    if (new RegExp('('+ k +')').test(filter))
      filter = filter.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return filter
}

const showErrorMes = (that, error) => { // 错误提示需统一处理的
  try {
    if (typeof window !== 'undefined') {
      let messageStr = error.code === 'ECONNABORTED' ? 'The system is busy. Please try to refresh it.' : error && error.message || 'The system is busy. Please try to refresh it.'
      that.$utils.message(messageStr)
      if (that.$bar.show) that.$bar.finish()
    }
  } catch (e) {
    console.log(e)
  }
}

export default {
  validateEmail,
  message,
  trim,
  formatDate,
  showErrorMes
}