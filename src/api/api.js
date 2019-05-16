// 接口地址配置文件
const apiBaseUrl = process.env.NODE_ENV === 'development' || process.env.NODE_TEST === 'TESTBASE' ? '' : '/vava-pc-gateway' // 线上域名环境需要添加vava-pc-getway网关
const uploadBaseUrl = process.env.NODE_ENV === 'development' || process.env.NODE_TEST === 'TESTBASE' ? '' : '/vava-file-gateway' // 线上域名环境需要添加vava-file-gateway网关
export default {
  // 公共接口
  sendEmail: apiBaseUrl + '/vava-pc-admin/common/sendEmail', // 发生邮件验证码
  getHomePage: apiBaseUrl + '/vava-pc-user/index/getHomeManagerBoByLanguageCode', // 首页
  selectDicTreeVoList: apiBaseUrl + '/vava-pc-admin/common/selectDicTreeVoList', // 获取数据字典
  uploadFile: uploadBaseUrl + '/vava-file-center/file/upload/', // 文件上传
  selectShopCountryVo: apiBaseUrl + '/vava-pc-admin/common/selectShopCountryVo', // 获取国家列表
  getRegion: apiBaseUrl + '/vava-pc-admin/common/selectShopCountryRegionVoByCountryId/', // 根据国家ID获取省份/地区
  validationAddress: apiBaseUrl + '/vava-pc-admin/common/validationAddress', // 校验收货地址区域是否支持
  // 登录注册接口
  signIn: apiBaseUrl + '/vava-pc-user/baseUser/indexLoginUser', // 登录
  userRegister: apiBaseUrl + '/vava-pc-user/baseUser/registerUser', // 注册
  getMemberInfo: apiBaseUrl + '/vava-pc-user/baseUser/v2/getMemberInfo', // 获取用户信息
  saveMemberInfo: apiBaseUrl + '/vava-pc-user/baseUser/saveMemberInfo', // 修改账户信息
  changePassword: apiBaseUrl + '/vava-pc-user/baseUser/changePassword', // 修改密码
  forgotPassword: apiBaseUrl + '/vava-pc-user/baseUser/forgotPassword', // 忘记密码
  // 收货地址管理
  addressAdd: apiBaseUrl + '/vava-pc-user/address/add', // 添加收货地址
  deleteAddress: apiBaseUrl + '/vava-pc-user/address/deleteByUuids', // 删除收货地址
  findAddressInfoListVo: apiBaseUrl + '/vava-pc-user/address/findAddressInfoListVo', // 获取收货地址列表
  addressEdit: apiBaseUrl + '/vava-pc-user/address/edit', // 编辑
  saveDefaultAddressByUuid: apiBaseUrl + '/vava-pc-user/address/saveDefaultByUuid/', // 设置默认地址
  // 支付方式管理
  creditAdd: apiBaseUrl + '/vava-pc-user/credit/cart/add', // 添加
  deleteCredit: apiBaseUrl + '/vava-pc-user/credit/cart/deleteByUuids', // 删除
  findCreditCardInfoListVo: apiBaseUrl + '/vava-pc-user/credit/cart/findCreditCardInfoListVo', // 获取列表
  creditEdit: apiBaseUrl + '/vava-pc-user/credit/cart/edit', // 编辑
  saveDefaultByUuid: apiBaseUrl + '/vava-pc-user/credit/cart/saveDefaultByUuid/', // 设置默认
  // 产品分类及产品详情
  getCategory: apiBaseUrl + '/vava-pc-product/category/findIndexCategoryInfo', // 产品分类
  getCategoryBanner: apiBaseUrl + '/vava-pc-product/category/getIndexCategoryInfoDetailById/', // 分类banner图
  getCategoryPro: apiBaseUrl + '/vava-pc-product/product/findProductListByIndex', // 分类产品信息
  getProOverview: apiBaseUrl + '/vava-pc-product/product/findProductOverviewByIndex', // 产品Overview
  getProSpecs: apiBaseUrl + '/vava-pc-product/product/selectProductSpecsBoByIndex/', // 产品参数
  getProFaq: apiBaseUrl + '/vava-pc-product/product/findProductFaqVoByIndex', // 产品详情faq
  getProDownload: apiBaseUrl + '/vava-pc-product/product/selectProductAttachmentDetailBoByIndex/', // 产品详情附件
  getProBuynow: apiBaseUrl + '/vava-pc-product/product/getIndexProductInfoDetailVo/', // 产品详情buynow
  // support详情
  getUserManual: apiBaseUrl + '/vava-pc-user/support/findUserManualProductList', // 获取support UserManual列表
  queryErpOrder: apiBaseUrl + '/vava-pc-user/support/getErpProductByOrderNo/', // 根据erp订单获取商品数据
  submitWarranty: apiBaseUrl + '/vava-pc-user/support/submitExtendedWarranty/', // 提交延保订单
  submitFeedback: apiBaseUrl + '/vava-pc-user/support/submitFeedbackInfo', // 提交用户反馈
  saveTouristsInfoVo: apiBaseUrl + '/vava-pc-user/support/saveTouristsInfoVo', // 提交游客信息
  // blog 相关接口
  getBlogBanner: apiBaseUrl + '/vava-pc-user/index/getIndexBlogManagerBannerByLanguageCode', // 获取blog首页banner
  getBlogHomeData: apiBaseUrl + '/vava-pc-user/index/findIndexBlogManagerModuleVoByLanguageCode', // 获取blog首页分组数据
  getBlogLabel: apiBaseUrl + '/vava-pc-user/index/findIndexBlogManagerModuleTitleVoByLanguageCode', // 获取blog标题数据
  getBlogModule: apiBaseUrl + '/vava-pc-user/index/findBlogManagerModuleDetailVoByManagerId', // 获取blog标题板块详情
  getBlogSearch: apiBaseUrl + '/vava-pc-user/index/findBlogManagerModuleDetailVo', // 获取blog搜索信息
  // 购物车接口
  applyForShopCartId: apiBaseUrl + '/vava-pc-order/cart/applyForShopCartId', // 申请购物车id(未登录)
  editShopCartNl: apiBaseUrl + '/vava-pc-order/cart/addNoLogin', // 添加/更新商品到购物车(未登录)
  editShopCart: apiBaseUrl + '/vava-pc-order/cart/add', // 添加/更新商品到购物车(已登录)(token)
  getShopCartListNl: apiBaseUrl + '/vava-pc-order/cart/findCartInfoListVoNoLogin/', // 购物车商品列表(未登录)
  getShopCartList: apiBaseUrl + '/vava-pc-order/cart/findCartInfoListVo', // 购物车商品列表-分页(已登录)(token)
  deleteShopCartNl: apiBaseUrl + '/vava-pc-order/cart/deleteByUuidsNoLogin/', // 删除购物车商品(未登录)
  deleteShopCart: apiBaseUrl + '/vava-pc-order/cart/deleteByUuids', // 删除购物车商品(已登录)(token)
  // 创建订单
  getOrderInfoPriceVo: apiBaseUrl + '/vava-pc-order/shop/getOrderInfoPriceVo', // 查询订单税费、总价
  checkCompletePay: apiBaseUrl + '/vava-pc-order/shop/checkCompletePay', // 查询订单是否完成支付
  submitOrderInfo: apiBaseUrl + '/vava-pc-order/shop/submitOrderInfo', // 提交订单信息
  // PP支付
  paypalOrder: apiBaseUrl + '/vava-pc-pay/pay/paypalOrder', // pp支付
}