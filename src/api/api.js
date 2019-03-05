// 接口地址配置文件
export default {
  // 公共接口
  sendEmail: '/vava-pc-admin/common/sendEmail', // 发生邮件验证码
  getHomePage: '/vava-pc-user/index/getHomeManagerBoByLanguageCode', // 首页
  selectDicTreeVoList: '/vava-pc-admin/common/selectDicTreeVoList',
  // 登录注册接口
  signIn: '/vava-pc-user/baseUser/indexLoginUser', // 登录
  userRegister: '/vava-pc-user/baseUser/registerUser', // 注册
  getMemberInfo: '/vava-pc-user/baseUser/getMemberInfo', // 获取用户信息
  saveMemberInfo: '/vava-pc-user/baseUser/saveMemberInfo', // 修改账户信息
  changePassword: '/vava-pc-user/baseUser/changePassword', // 修改密码
  forgotPassword: '/vava-pc-user/baseUser/forgotPassword', // 忘记密码
  // 产品分类及产品详情
  getCategory: '/vava-pc-product/category/findIndexCategoryInfo', // 产品分类
  getCategoryBanner: '/vava-pc-product/category/getIndexCategoryInfoDetailById/', // 分类banner图
  getCategoryPro: '/vava-pc-product/product/findProductListByIndex', // 分类产品信息
  getProOverview: '/vava-pc-product/product/findProductOverviewByIndex', // 产品Overview
  getProSpecs: '/vava-pc-product/product/selectProductSpecsBoByIndex/', // 产品参数
  getProFaq: '/vava-pc-product/product/findProductFaqVoByIndex', // 产品详情faq
  getProDownload: '/vava-pc-product/product/selectProductAttachmentDetailBoByIndex/', // 产品详情附件
  getProBuynow: '/vava-pc-product/product/getIndexProductInfoDetailVo/', // 产品详情buynow
  // support详情
  getUserManual: '/vava-pc-user/support/findUserManualProductList', // 获取support UserManual列表
  queryErpOrder: '/vava-pc-user/support/getErpProductByOrderNo/', // 根据erp订单获取商品数据
  submitWarranty: '/vava-pc-user/support/submitExtendedWarranty', // 提交延保订单
  submitFeedback: '/vava-pc-user/support/submitFeedbackInfo', // 提交用户反馈
  // blog 相关接口
  
}