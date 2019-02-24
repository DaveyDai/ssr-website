import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      categoryData: {}, // 产品分类信息
      testData: { test: 'Store测试1' },
      language: ''
    },
    actions,
    mutations,
    getters
  })
}
