import { createApp } from './app'
// import { error } from 'util';

const isDev = process.env.NODE_ENV !== 'production'

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
      context.serverError = false
      matchedComponents.push({asyncData: app.asyncData}) // 全局请求--如分类菜单
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
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
