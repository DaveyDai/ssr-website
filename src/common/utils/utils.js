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

const setScroll = (scrollHeight) => { // 设置滚动条位置 注意只能在浏览器客户端调用
  try {
    let tahtScrollTop = window.document.getElementsByTagName('html')[0].scrollTop
    window.document.getElementsByTagName('html')[0].scrollTop = scrollHeight
    if (window.document.getElementsByTagName('html')[0].scrollTop === tahtScrollTop) window.scrollTo(0, scrollHeight)
  }catch(e){console.log(e)}
}

const browserRedirect = () => { // 判断当前浏览器终端类型
  let browser = {
    versions () {
      let u = navigator.userAgent
      return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
      }
    },
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  return browser.versions().mobile
}

const toDecimal = x => { // 转换金额函数
  var f = parseFloat(x);
  if (isNaN(f)) {
      return false;
  }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
      rs = s.length;
      s += '.';
  }
  while (s.length <= rs + 2) {
      s += '0';
  }
  return s;
}

export default {
  validateEmail,
  message,
  trim,
  formatDate,
  showErrorMes,
  setScroll,
  browserRedirect,
  toDecimal
}