import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const Test = () => import('../views/product-view/product-list.vue')
const IconTest = () => import('../views/test.vue')
const HomePage = () => import('../views/home-page/index.vue') // 首页
const ErrorPage = () => import('../views/error/index.vue') // 404
const LoginPage = () => import('../views/account/login.vue') // login
const ForgotPassword = () => import('../views/account/forgot-password.vue') // 忘记密码
const CreateAccount = () => import('../views/account/create-account.vue') // 忘记密码
const ProductMain = () => import('../views/products/product-main.vue') // 产品主页
const ProductDetail = () => import('../views/products/product-detail.vue') // 产品详情
const Support = () => import('../views/support/index.vue') // support首页
const Warranty = () => import('../views/support/warranty.vue') // warranty首页
const UserManual = () => import('../views/support/user-manual.vue') // user-manual首页
const AfterSales = () => import('../views/support/after-sales.vue') // after-sales首页
const TermsConditions = () => import('../views/support/terms-conditions.vue') // terms-conditions首页
const PrivatePolicy = () => import('../views/support/private-policy.vue') // private-policy首页

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
      { path: '/404', component: ErrorPage },
      { path: '/c/:cId', component: ProductMain },
      { path: '/p/:pId', component: ProductDetail },
      { path: '/support', component: Support },
      { path: '/support/warranty', component: Warranty },
      { path: '/support/user-manual', component: UserManual },
      { path: '/support/after-sales', component: AfterSales },
      { path: '/support/terms-conditions', component: TermsConditions },
      { path: '/support/private-policy', component: PrivatePolicy },
      {path: '/test', name: 'Test', component: Test},
      {path: '/', name: 'homePage', component: HomePage},
      {path: '/icontest', name: 'icontest', component: IconTest}
      // { path: '/', redirect: '/test' }
    ]
  })
}
