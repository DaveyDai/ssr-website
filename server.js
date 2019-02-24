const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const request = require('axios')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo = `express/${require('express/package.json').version} vue-server-renderer/${require('vue-server-renderer/package.json').version}`
const app = express()
function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: LRU({max: 1000, maxAge: 1000 * 60 * 60 * 24}), // 设置服务器缓存
    basedir: resolve('./dist'), // this is only needed when vue-server-renderer is npm-linked
    runInNewContext: false
  }))
}
let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')
if (isProd) { // 打包环境
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {template, clientManifest})
} else { // 本地热更新环境
  readyPromise = require('./build/setup-dev-server')(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}
const serve = (path, cache) => express.static(resolve(path), { // 静态文件缓存时间
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
// 声明静态资源文件目录
app.use(compression({ threshold: 0 })) // 压缩资源
app.use(favicon('./static/website-logo/logo-48.png'))
app.use('/dist', serve('./dist', true))
app.use('/static', serve('./static', true))
app.use('/src/assets/', serve('./src/assets/', true))
app.use('/manifest.json', serve('./manifest.json', true))
//app.use('/service-worker.js', serve('./dist/service-worker.js'))
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl)) // https://www.nginx.com/blog/benefits-of-microcaching-nginx/ 所有页面内容均可缓存 若有特定的内容 需自定义设置缓存

function render (req, res) { // 兼容旧地址进行重定向
  // http://www.vava.com/downloads-VA-AH015-CE-Cert.html重定向到根据VA-AH015关键字获取到的访问地址http://www.vava.com/product/VAVA%205%20L%20170%20oz%20Cool%20Mist%20Humidifier-p-44.html
  if (req.url.match(/downloads-(\S*)-CE-Cert/)) {
    const getRedirectUrlByModelUrl = 'https://api.vava.com/brand-gateway/brand-product-vava/support/getRedirectUrlByModel?model=' + req.url.match(/downloads-(\S*)-CE-Cert/)[1]
    request.get(getRedirectUrlByModelUrl, {}).then(function (response) {
      res.redirect(response.data.resCode === 0 ? '/product' + response.data.data + '.html' : "/")
    }).catch(function (error) {
      renderStart(req, res)
    })
  } else { renderStart(req, res) }
}

function renderStart (req, res) { // 开始render
  const s = Date.now()
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)
  const handleError = err => { // 异常待处理
    console.log('服务端渲染异常:', req.url)
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.redirect('/404')
    } else {
      // res.status(500).send(err)
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
      res.redirect('/')
    }
  }
  let cookiesLang = 'en' // 默认英文
  if (req.headers.cookie && req.headers.cookie.indexOf('language=') !== -1) {
    let cookiesData = req.headers.cookie.split(';')
    for (let i = cookiesData.length; i--;) if (cookiesData[i].indexOf('language=') !== -1) cookiesLang = cookiesData[i].split('=')[1]
  }
  console.log('cookie：', req.headers.cookie)
  res.setHeader('Set-Cookie', 'language=' + cookiesLang) // 设置cookie
  renderer.renderToString({title: 'VAVA', url: req.url, language: cookiesLang}, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) console.log(`whole request: ${Date.now() - s}ms`)
  })
}
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

app.listen(8888, () => {
  console.log(`server started at localhost:8888`)
})
