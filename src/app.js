import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import VueCookies from 'vue-cookies'
import titleMixin from './common/utils/title'
import VueI18n from 'vue-i18n'
import l_en from '@/common/language/en'
import l_zh_CN from '@/common/language/zh'
import Utils from '@/common/utils/utils.js' // 工具方法
import VavaUi from '@/components/components.js'
import * as filters from '@/common/utils/filters'
// import '@/common/swiper/swiper.min.less'
// mixin for handling title
Vue.mixin(titleMixin)
Vue.use(VueI18n)
Vue.use(VueCookies)
VavaUi.map(component => {
  Vue.use(component)
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
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
      Vue.prototype.$utils = Utils
      Vue.prototype.isIphone = navigator.userAgent.indexOf('iPhone') !== -1 // 是否是ios设备 true 是 false 不是
      Vue.prototype.$scrollReveal = require('scrollreveal') // 滚动动画插件
    }
  })
}
// 创建vue实例
export function createApp (language, token) {
  const store = createStore()
  const router = createRouter()
  // console.log(typeof window === 'undefined' ? '服务端' : window)
  sync(store, router)
  // 通过cookie同步地区语言
  let languageData = language || Vue.cookies.get('language') || 'l_en'
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
  // router.afterEach((to, from, next) => {
  //   if (typeof window !== 'undefined') window.document.getElementsByTagName('html')[0].scrollTop = 0
  // })
  return { app, router, store }
}
