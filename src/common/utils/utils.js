import message from './vava-message.js'
// 邮箱校验
const validateEmail = value => {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value || '')
}
// 清楚左右空格
const trim = value => {
  return value.replace(/(^\s*)|(\s*$)/g, '')
}
export default {
  validateEmail,
  message,
  trim
}