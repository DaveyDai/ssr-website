// 接口地址配置文件
export default {
  // 公共接口
  sendEmail: '/vava-pc-admin/common/sendEmail', // 发生邮件验证码
  getHomePage: '/vava-pc-user/index/getHomeManagerBoByLanguageCode', // 首页
  // 登录注册接口
  signIn: '/vava-pc-user/baseUser/indexLoginUser', // 登录
  userRegister: '/vava-pc-user/baseUser/registerUser', // 注册
  getMemberInfo: '/vava-pc-user/baseUser/getMemberInfo', // 获取用户信息
  saveMemberInfo: '/vava-pc-user/baseUser/saveMemberInfo', // 修改账户信息
  changePassword: '/vava-pc-user/baseUser/changePassword', // 修改密码
  forgotPassword: '/vava-pc-user/baseUser/forgotPassword', // 忘记密码
  // 产品分类及产品详情
  getCategory: '/vava-pc-product/category/findIndexCategoryInfo',
}