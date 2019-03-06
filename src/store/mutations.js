import Vue from 'vue'
import VueCookies from 'vue-cookies'
export default {
  setCategoryList (state, data) {
    state.categoryList = data
  },
  setCategoryData (state, data) {
    state.categoryData[data.cId] = data
  },
  setSearchProduct (state, data) {
    state.searchProduct = data
  },
  setLanguage (state, data) {
    state.language = data
  },
  setToken (state, data) {
    state.token = data
    VueCookies.set('token', data)
  },
  setAccountData (state, data) {
    state.accountData = data
  },
  setHomePageData (state, data) {
    state.homePageData = data
  },
  setProductDetail (state, data) {
    state.productDetail = data
  },
  setDicTreeList (state, data) { // 保存数据字典---全部转换成 key value形式
    let docData = {}
    try {
      for(let i = data.length; i--;) {
        for(let j = data[i].dicItemVos.length; j--;) {
          docData[data[i].dicItemVos[j].dicCode] = data[i].dicItemVos[j].dicValue
        }
      }
      state.dicTreeList = docData
    } catch (err) {
      state.dicTreeList = {}
    }
  },
  setUserManual (state, data) {
    state.userManual = data
  },
  setBlogData (state, data) {
    state.blogData = data
  }
}
