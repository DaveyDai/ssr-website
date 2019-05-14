import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import VueCookies from 'vue-cookies'
import VueI18n from 'vue-i18n'
import l_en from '@/common/language/en'
import l_zh_CN from '@/common/language/zh'
import Utils from '@/common/utils/utils.js' // 工具方法
import VavaUi from '@/components/components.js' // 全局公共组件
import * as filters from '@/common/utils/filters'
import Element from '@/components/element-ui' // 引入部分element-ui组件

Object.keys(Element).forEach(key => {
  Vue.component(Element[key].name, Element[key])
})
Vue.use(VueI18n)
Vue.use(VueCookies)
VavaUi.map(component => {
  Vue.use(component)
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$utils = Utils
if (process.browser) {
  Vue.use(require('vue-awesome-swiper/dist/ssr'))
  Vue.use(require('vue-lazyload'), {
    preLoad: 1.6,   // 预加载的宽高比
    // error: 'dist/error.png', // 图片加载失败时使用的图片源
    // loading: 'dist/loading.gif', // 图片加载的路径
    attempt: 2 //尝试加载次数
  })
  Vue.use({
    install: function (Vue) {
      Vue.prototype.isIphone = navigator.userAgent.indexOf('iPhone') !== -1 // 是否是ios设备 true 是 false 不是
      Vue.prototype.$scrollReveal = require('scrollreveal') // 滚动动画插件
    }
  })
}
// 创建vue实例
export function createApp (language, token, isMobile) {
  const store = createStore()
  const router = createRouter()
  sync(store, router)
  let languageData = language || Vue.cookies.get('language') || 'l_en' // 通过cookie同步地区语言
  const i18n = new VueI18n({ locale: languageData, messages: { l_en, l_zh_CN } }) // 国际化
  const app = new Vue({
    router,
    store,
    i18n,
    data () {
      return { asyncData: ({ store }) => store.dispatch('queryCategoryList') }
    },
    render: h => h(App)
  })
  router.beforeEach((to, from, next) => {
    let userToken = typeof window !== 'undefined' ? Vue.cookies.get('token') : token
    to.path === '/account' && !userToken ? next('/login') : next()
  })
  return { app, router, store }
}
