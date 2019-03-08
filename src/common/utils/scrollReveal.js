// scrollReveal滚动动画配置 https://www.jqhtml.com/6913.html
const scrollRevealFunction = function (scrollReveal, className, type) {
  let scrollRevealConfig = new scrollReveal.default()
  scrollRevealConfig.reveal(className, {
    container: window.document.getElementsByTagName('html')[0], // 滚动容器
    origin: 'bottom', // 方向
    distance: '10%', // 距离
    duration: 800, // 动画持续时间，单位毫秒
    delay: 200, // 延迟时间
    opacity: 0.001, // 开始的透明度
    scale: 0.9, // 开始的缩放值
    easing: 'ease-out', // 动画的easing效果，可以是任何有效的CSS easing值
    mobile: true, // 是否在移动手机上显示动画效果
    reset: false // 元素是否在容器边界内来回滚动时都产生动画效果
  })
}
export default {
  init: scrollRevealFunction
}
