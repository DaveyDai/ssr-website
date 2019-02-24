import Vue from 'vue'
export default {
  setCategoryData (state, data) {
    state.categoryData[data.data.cId] = data.data
  },
  setTestData (state, data) {
    state.testData = data
  },
  setLanguage (state, data) {
    state.language = data
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
