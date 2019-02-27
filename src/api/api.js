// 接口地址配置文件
export default {
  // 公共接口
  sendEmail: '/vava-pc-admin/common/sendEmail', // 发生邮件验证码
  // 登录注册接口
  signIn: '/vava-pc-user/baseUser/indexLoginUser', // 登录
  userRegister: '/vava-pc-user/baseUser/registerUser', // 注册
  getMemberInfo: '/vava-pc-user/baseUser/getMemberInfo', // 获取用户信息
  // 查询分类
  getCategory: '/vava-pc-product/category/findIndexCategoryInfo'
}