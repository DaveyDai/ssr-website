import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

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
const Influencer = () => import('../views/support/influencer.vue') // influencer首页
const Feedback = () => import('../views/support/feedback.vue') // feedback首页
const Blog = () => import('../views/blog/index.vue') // blog首页
const BlogDetail = () => import('../views/blog/blog-detail.vue') // blog-detail
const BlogSearch = () => import('../views/blog/blog-search.vue') // blog-search
const ShoppingCart = () => import('../views/shopping-cart/index.vue') // 购物车列表
const ShoppingCustomer = () => import('../views/shopping-order/payment-pc/shopping-customer.vue') // 购物车判断登陆
const ShoppingCustomerMobile = () => import('../views/shopping-order/payment-mobile/shopping-customer.vue') // 购物车判断登陆
// const ShoppingCustomerGuest= () => import('../views/shopping-order/payment-mobile/customer-guest.vue') // 购物车判断登陆
// const ShoppingCustomerLogin = () => import('../views/shopping-order/payment-mobile/shopping-login.vue') // 购物车判断登陆
const ShoppingOrder = () => import('../views/shopping-order/index.vue') // pc下单
const CustomerEmail = () => import('../views/shopping-order/payment-mobile/shopping-customer.vue') // 未登陆下单输入邮箱
const PayMobile = () => import('../views/shopping-order/payment-mobile/shopping-edit.vue') // 移动端下单
const PayAddrDetail = () => import('../views/shopping-order/payment-mobile/pay-addressdetail.vue') // 移动端编辑收货地址
const PayAddrList = () => import('../views/shopping-order/payment-mobile/pay-addresslist.vue') // 移动端收货地址列表
const PayCoupon = () => import('../views/shopping-order/payment-mobile/pay-coupon.vue') // 移动端优惠码
const PayResult = () => import('../views/shopping-order/pay-result.vue') // 移动端优惠码

/* meta参数说明开始 */
/**
 * blog: 当然路由属于blog模块(blog模块公共头部和footer不一样)
 * isShoppingcart: 当前路由是否是购物车及支付流程模块
 */
/* meta参数说明结束 */
export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior (to, from, savedPosition) {
      if (typeof window !== 'undefined') {
        window.document.getElementsByTagName('html')[0].scrollTop = 0
        try {window.scrollTo(0,0)}catch(e){console.log(e)}
      }
    },
    routes: [
      { path: '/login', name: 'login', component: LoginPage },
      { path: '/forgot-password', component: ForgotPassword },
      { path: '/create-account', component: CreateAccount },
      { path: '/account', component: Account },
      { path: '/404', component: ErrorPage },
      { path: '/c/:cId', component: ProductMain, meta: {sourceCode: 'SUB_PRODUCT_SOURCE'} },
      { path: '/p/:pId', component: ProductDetail, meta: {sourceCode: 'SUB_PRODUCT_DETAIL_SOURCE'} },
      { path: '/product/search', component: ProductSearch },
      { path: '/support', component: Support },
      { path: '/support/warranty', component: Warranty },
      { path: '/support/user-manual', component: UserManual },
      { path: '/support/after-sales', component: AfterSales },
      { path: '/support/terms-conditions', component: TermsConditions },
      { path: '/support/private-policy', component: PrivatePolicy },
      { path: '/support/influencer', component: Influencer },
      { path: '/support/feedback', component: Feedback },
      { path: '/blog', component: Blog, meta: {blog: true} },
      { path: '/blog/:label(\\d+)', component: BlogDetail, meta: {blog: true} },
      { path: '/blog/search', component: BlogSearch, meta: {blog: true} },
      { path: '/about.html', component: AboutUs},
      { path: '/shopping-cart', component: ShoppingCart, meta: {isShoppingcart: true} },
      { path: '/shopping-customer', component: ShoppingCustomer, meta: {isShoppingcart: true} },
      { path: '/shopping-customer-m/:id', name: 'ShoppingCustomerMobile', component: ShoppingCustomerMobile, meta: {isShoppingcart: true} },
      // { path: '/shopping-customer-guest', name: 'ShoppingCustomerGuest', component: ShoppingCustomerGuest },
      // { path: '/shopping-customer-login', name: 'ShoppingCustomerLogin', component: ShoppingCustomerLogin },
      { path: '/customer-email', component: CustomerEmail, meta: {isShoppingcart: true} },
      { path: '/pay', component: ShoppingOrder, meta: {isShoppingcart: true} },
      { path: '/pay-m', component: PayMobile, meta: {isShoppingcart: true} },
      { path: '/pay-addressdetail', component: PayAddrDetail, meta: {isShoppingcart: true} },
      { path: '/pay-addrList', component: PayAddrList, meta: {isShoppingcart: true} },
      { path: '/pay-coupon', component: PayCoupon, meta: {isShoppingcart: true} },
      { path: '/pay-result', component: PayResult, meta: {isShoppingcart: true} },
      { path: '/', name: 'homePage', component: HomePage, meta: {sourceCode: 'SUB_INDEX_SOURCE'} },
      { path: '/icontest', name: 'icontest', component: IconTest } // 测试页面
    ]
  })
}