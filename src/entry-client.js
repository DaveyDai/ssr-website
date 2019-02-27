import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      bar.start()
      asyncData({store: this.$store, route: to}).then(() => {
        next()
        bar.finish()
      }).catch(() => {
        bar.finish()
        next()
      })
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady((currentRoute) => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
      next()
      bar.finish()
    }).catch(error => {
      console.log('server error:', error)
      next()
      bar.finish()
    })
  })
  if(window.__serverRenderError){ // 如果拿到服务端的错误状态，则执行客户端渲染程序
    feCompatibleRende(currentRoute);
  }
  store.commit('setToken', app.$cookies.get('token') || '') // 同步store token
  app.$mount('#app')
})
// node报错时前端路由重渲染
function feCompatibleRende(route){
  let matched = router.getMatchedComponents(route);
  Promise.all(matched.map(c => {
    if (c.preFetch) {
      return c.preFetch({
        store,
        route,
        req: { headers: { cookie: document.cookie} }
      })
    }
  })).then(() => { console.log('res client success!') }).catch((e) => { console.error(e) })
}
// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
