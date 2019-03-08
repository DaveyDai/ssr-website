import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      dicTreeList: {}, // 数据字典
      homePageData: {bannerImages: [], productImages: [], socialMediaImages: []}, // 首页数据
      productMainData: {}, // 产品首页数据
      categoryList: [], // 产品分类
      categoryData: {}, // 产品分类信息---按分类ID保存，避免重复请求
      language: 'l_en', // 当前地区/语言
      token: '', // token
      accountData: {}, // 账户信息
      productDetail: {overviewData: {}, specs: {}, support: {}, buynow: {}}, // 产品详情
      searchProduct: {records: []}, // 产品搜索结果
      userManual: {}, // UserManual产品列表
      blogData: {bannerData: [], labelData: [], homeData: []}, // blog首页数据
      blogDetailData: {},
      searchBlog: {records: []}, // blog搜索结果
    },
    actions,
    mutations,
    getters
  })
}
