import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const IconTest = () => import('../views/test.vue')
const HomePage = () => import('../views/home-page/index.vue') // 首页
const AboutUs = () => import('../views/home-page/about-us.vue') // 首页
const ErrorPage = () => import('../views/error/index.vue') // 404
const LoginPage = () => import('../views/account/login.vue') // login
const ForgotPassword = () => import('../views/account/forgot-password.vue') // 忘记密码
const CreateAccount = () => import('../views/account/create-account.vue') // 用户中心
const Account = () => import('../views/account/index.vue') // 忘记密码
const ProductMain = () => import('../views/products/product-main.vue') // 产品主页
const ProductSearch = () => import('../views/products/product-search.vue') // 搜索产品
const ProductDetail = () => import('../views/products/product-detail.vue') // 产品详情
const Support = () => import('../views/support/index.vue') // support首页
const Warranty = () => import('../views/support/warranty.vue') // warranty首页
const UserManual = () => import('../views/support/user-manual.vue') // user-manual首页
const AfterSales = () => import('../views/support/after-sales.vue') // after-sales首页
const TermsConditions = () => import('../views/support/terms-conditions.vue') // terms-conditions首页
const PrivatePolicy = () => import('../views/support/private-policy.vue') // private-policy首页
const Influeucer = () => import('../views/support/influeucer.vue') // influeucer首页
const Feedback = () => import('../views/support/feedback.vue') // feedback首页
const Blog = () => import('../views/blog/index.vue') // blog首页
const BlogDetail = () => import('../views/blog/blog-detail.vue') // blog-detail
const BlogSearch = () => import('../views/blog/blog-search.vue') // blog-search

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior (to, from, savedPosition) {
      if (typeof window !== 'undefined') window.document.getElementById('app').scrollTo(0, 0)
    },
    routes: [
      // { path: '/top/:page(\\d+)?', component: createListView('top') },
      // { path: '/new/:page(\\d+)?', component: createListView('new') },
      // { path: '/show/:page(\\d+)?', component: createListView('show') },
      // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      // { path: '/job/:page(\\d+)?', component: createListView('job') },
      // { path: '/item/:id(\\d+)', component: ItemView },
      
      { path: '/login', name: 'login', component: LoginPage },
      { path: '/forgot-password', component: ForgotPassword },
      { path: '/create-account', component: CreateAccount },
      { path: '/account', component: Account },
      { path: '/404', component: ErrorPage },
      { path: '/c/:cId', component: ProductMain, meta: {sourceCode: 'SUB_PRODUCT_SOURCE'} },
      { path: '/p/:pId', component: ProductDetail, meta: {sourceCode: 'SUB_PRODUCT_DETAIL_SOURCE'} },
      { path: '/product/search/:keyword', component: ProductSearch },
      { path: '/support', component: Support },
      { path: '/support/warranty', component: Warranty },
      { path: '/support/user-manual', component: UserManual },
      { path: '/support/after-sales', component: AfterSales },
      { path: '/support/terms-conditions', component: TermsConditions },
      { path: '/support/private-policy', component: PrivatePolicy },
      { path: '/support/influeucer', component: Influeucer },
      { path: '/support/feedback', component: Feedback },
      { path: '/blog', component: Blog, meta: {blog: true} },
      { path: '/blog/:label(\\d+)', component: BlogDetail, meta: {blog: true} },
      { path: '/blog/search/:keyword', component: BlogSearch, meta: {blog: true} },
      {path: '/about-us', component: AboutUs},
      {path: '/', name: 'homePage', component: HomePage, meta: {sourceCode: 'SUB_INDEX_SOURCE'} },
      {path: '/icontest', name: 'icontest', component: IconTest}
      // { path: '/', redirect: '/test' }
    ]
  })
}
