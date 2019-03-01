import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      homePageData: {bannerImages: [], productImages: [], socialMediaImages: []}, // 首页数据
      productMainData: {}, // 产品首页数据
      categoryList: [], // 产品分类
      categoryData: {}, // 产品分类信息---按分类ID保存，避免重复请求
      language: 'en', // 当前地区/语言
      token: '', // token
      accountData: {}, // 账户信息
      productDetail: {overviewData: {}, specs: {}, support: {}, buynow: {}} // 产品详情
    },
    actions,
    mutations,
    getters
  })
}
