import Vue from 'vue'
import VueCookies from 'vue-cookies'
export default {
  setCategoryList (state, data) {
    state.categoryList = data
  },
  setCategoryData (state, data) {
    state.categoryData[data.cId] = data
  },
  setTestData (state, data) {
    state.testData = data
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
  }
  // SET_LIST: (state, { type, ids }) => {
  //   state.lists[type] = ids
  // },

  // SET_ITEMS: (state, { items }) => {
  //   items.forEach(item => {
  //     if (item) {
  //       Vue.set(state.items, item.id, item)
  //     }
  //   })
  // },

  // SET_USER: (state, { id, user }) => {
  //   Vue.set(state.users, id, user || false) /* false means user not found */
  // }
}
