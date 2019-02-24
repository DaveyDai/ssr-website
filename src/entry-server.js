import { createApp } from './app'
// import { error } from 'util';

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp(context.language)

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      context.serverError = false
      matchedComponents.push({asyncData: app.asyncData}) // 全局请求--如分类菜单
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch(function (error) { // 这里不直接抛出异常
        try {
          console.log('node服务请求异常错误日志：', '===请求地址:' + error.response.request.res.responseUrl, '===错误内容:' + error.response.data) // 打印错误日志
        } catch (err) {
          console.log('node服务错误日志：', error)
        }
        context.serverError = true // 其次，增加服务端预渲染错误标识，前端拿到标志后重新渲染
        resolve(app) //将服务端vue实例正常返回，避免抛500
      })
    }, reject)
  })
}
