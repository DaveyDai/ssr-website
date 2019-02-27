import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import VueCookies from 'vue-cookies'
import titleMixin from './common/utils/title'
import * as filters from './common/utils/filters'
import VueI18n from 'vue-i18n'
import en from '@/common/language/en'
import zh from '@/common/language/zh'
import Utils from '@/common/utils/utils.js' // 工具方法
import VavaUi from '@/components/components.js'
// mixin for handling title
Vue.mixin(titleMixin)
Vue.use(VueI18n)
Vue.use(VueCookies)
VavaUi.map(component => {
  Vue.use(component)
})
if (process.browser) {
  Vue.use(require('@/common/swiper/ssr.js'))
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
  // const scrollReveal = require('scrollreveal')
  // Vue.prototype.$scrollReveal = scrollReveal;
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (language) {
  // create store and router instances
  const store = createStore()
  const router = createRouter()
  // console.log(typeof global)
  // console.log(typeof window === 'undefined' ? '服务端' : window)
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)
  // 通过cookie同步语言
  let languageData = language || Vue.cookies.get('language') || 'en'
  const i18n = new VueI18n({ locale: languageData, messages: { en, zh } }) // 国际化
  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    i18n,
    data () {
      return { asyncData: ({ store, route }) => store.dispatch('queryCategoryList') }
    },
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
