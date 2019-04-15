/**
 * message提示框 参数 options
 * @param showContent 提示内容
 * @returns {boolean}
 */
const Message = function(showContent, isTimeHidden) {
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
  if (!isTimeHidden) {
    setTimeout(() => {
      closeMessage()
    }, 2000)
  }
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

export default Message