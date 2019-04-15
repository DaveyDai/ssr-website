// 兼容超过2行省略号
// export function strSlice (str) {
//   return str
// }
// 单词首字母大写  小于等于2个字符 都大写
export function characterCase(str) {
  if (!str) return str
  let caseStr = str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  return caseStr.split(' ').map(item => item.length <= 2 ? item.toUpperCase() : item).join(' ')
}

// 价格自动补全2位小数
export function decimalDou (val) {
  let decimaArr = val.toString().split('.')
  decimaArr.length === 1 ? decimaArr.push('00') : decimaArr[1].length === 1 ? decimaArr[1] = decimaArr[1] + '0' : ''
  return decimaArr.join('.')
}
