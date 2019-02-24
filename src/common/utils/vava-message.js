/**
 * message提示框 参数 options
 * @param showContent 提示内容
 * @returns {boolean}
 */
const Message = function(showContent) {
  let toastEle = document.getElementById('vavaMessageBox')
  if (Object.prototype.toString.call(toastEle) === '[object HTMLDivElement]') toastEle.parentNode.removeChild(toastEle)
  let messageEle = document.createElement('div')
  messageEle.id = 'vavaMessageBox'
  messageEle.innerHTML = `<div class="message-box-content"><p>${showContent}</p><span class="icon icon-close"></span></div><div class="message-box-mask"></div>`
  document.getElementById('app').appendChild(messageEle)
  setTimeout(function() {
    document.getElementById('vavaMessageBox').className = 'message-box-active'
    document.getElementById('vavaMessageBox').getElementsByClassName('icon-close')[0].addEventListener('click', function (e) {
      closeMessage()
    })
    document.getElementById('vavaMessageBox').getElementsByClassName('message-box-mask')[0].addEventListener('click', function (e) {
      closeMessage()
    })
    // document.getElementById('vavaMessageBox').addEventListener('click', function (e) {
    //   e.preventDefault
    //   closeMessage()
    // })
    // document.getElementById('vavaMessageBox').getElementsByClassName('message-box-content')[0].addEventListener('click', function (e) {
    //   e.stopPropagation;
    // })
  }, 10)

}
const closeMessage = function () {
  let toastEle = document.getElementById('vavaMessageBox')
  if (Object.prototype.toString.call(toastEle) === '[object HTMLDivElement]') {
    document.getElementById('vavaMessageBox').className = ''
    setTimeout(function() {
      if (toastEle && toastEle.parentNode) toastEle.parentNode.removeChild(toastEle)
    }, 300)
  }
}
Message.close = function () {
  closeMessage()
}

// export default function (obj) {
//   if (!obj.showContent) console.error('提示内容不能为空!')
//   let toastDom = document.getElementById('messageModel')
//   if (toastDom) toastDom.parentNode.removeChild(toastDom)
//   let messageEle = document.createElement('div')
//   messageEle.id = 'messageModel'
//   messageEle.innerHTML = `${obj.showContent}<i class="icon ${obj.type === 'error' && 'icon-warn' || 'icon-tick'}"></i>`
//   messageEle.className = `toast-message toast-message-${obj.type || 'success'}`
//   if (typeof obj.top !== 'undefined') messageEle.style.cssText = `top:${obj.top};`
//   if (Object.prototype.toString.call(obj.eleId) === '[object HTMLDivElement]') {
//     messageEle.style.position = 'relative'
//     obj.eleId.appendChild(messageEle)
//   } else {
//     document.getElementById('app').appendChild(messageEle)
//   }
//   // document.body.appendChild(instance.$el);
//   setTimeout(() => {
//     messageEle.style.height = '0.8rem'
//   }, 0)
//   if (!obj.isHidden) {
//     setTimeout(() => {
//       messageEle.style.height = '0'
//       setTimeout(() => {
//         let toastEle = document.getElementById('messageModel')
//         if (Object.prototype.toString.call(toastEle) === '[object HTMLDivElement]') toastEle.parentNode.removeChild(toastEle)
//       }, 500)
//     }, 1500)
//   }
//   return this
// }
export default Message