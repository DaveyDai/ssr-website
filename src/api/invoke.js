
/**
 * 获取购物车列表
 * @param { Object }  vm     vue实例
 * @param { Boolean } isInit app.vue页面初始化
 */
export function invokeGetShoppingCart (vm, isInit = false, callback, errorCallback) {
  if (vm.$cookies.get('token')) {
    // 获取登录用户购物车列表
    vm.$store.dispatch('postFetch', {api: 'getShopCartList', data: {pageNo: 1, pageSize: 100, condition: {}}}).then(data => {
      vm.$utils.setShoppingCart(vm.$store.commit, vm.$utils.calculationCart(data.records)) // 保存购物车信息到本地和store
      if (typeof callback === 'function') {
        callback()
      } 
    }).catch(error => {
      if (typeof errorCallback === 'function') {
        errorCallback()
      } else {
        vm.$utils.showErrorMes(vm, error)
      }
    })
  } else {
    if (isInit) {
      // 获取本地缓存购物车列表
      let shoppingCartData = localStorage.getItem('shoppingCarts') ? JSON.parse(localStorage.getItem('shoppingCarts')) : {totalNum: 0, shoppingCartId: '', productList: []}
      vm.$store.commit('setShoppingCart', shoppingCartData)
    } else {
      // 获取购物车列表， 未登陆时根据购物车ID
      if (vm.$store.state.shoppingCart.shoppingCartId) {
        vm.$store.dispatch('postByUrl', {api: 'getShopCartListNl', data: vm.shoppingCart.shoppingCartId}).then(data => {
          vm.$utils.setShoppingCart(vm.$store.commit, vm.$utils.calculationCart(data, vm.$store.state.shoppingCart.shoppingCartId)) // 保存购物车信息到本地和store
          if (typeof callback === 'function') {
            callback()
          } 
        }).catch(error => {
          if (typeof errorCallback === 'function') {
            errorCallback()
          } else {
            vm.$utils.showErrorMes(vm, error)
          }
        })
      }
    }
  }
}

/**
 * 添加购物车（登录用户）
 * @param { Object } vm     vue实例
 * @param { Object } params 参数对象
 */
export function invokeShoppingCartAdd (vm, params, callback, errorCallback) { // 添加购物车 (编辑购物车接口最好改一下 post请求不要用URL拼接参数)
  vm.$store.dispatch('postFetch', {api: 'editShopCart', data: params}).then(data => {
    // this.$utils.setShoppingCart(this.$store.commit, this.$utils.calculationCart(data.records)) // 保存登录用户购物车数据
    if (typeof callback === 'function') {
      callback()
    } 
  }).catch(error => {
    if (typeof errorCallback === 'function') {
      errorCallback()
    } else {
      vm.$utils.showErrorMes(vm, error)
    }
  })
}

/**
 * 添加购物车，如未有购物车ID，第一次接口返回新的购物车ID，根据购物车ID添加数据（非登录用户）
 * @param { Object } vm     vue实例
 * @param { Object } params 参数对象
 */
export function invokeShoppingCartAddById (vm, params, callback, errorCallback) { 
  vm.$store.dispatch('postByUrl', {api: 'editShopCartNl', bodyData: params, data: '?shopCartId=' + vm.$store.state.shoppingCart.shoppingCartId}).then(data => {
    // 未登录用户添加购物车ID
    let cartData = vm.$store.state.shoppingCart || {}
    cartData.shoppingCartId = data.shopCartId
    vm.$store.commit('setShoppingCart', cartData)
    if (typeof callback === 'function') {
      callback()
    } 
  }).catch(error => {
    if (typeof errorCallback === 'function') {
      errorCallback()
    } else {
      vm.$utils.showErrorMes(vm, error)
    }
  })
}
