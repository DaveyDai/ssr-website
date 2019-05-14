// element-ui组件管理
import Vue from 'vue'
import { Input, Select, Form, FormItem, Option, Dialog, MessageBox, InputNumber, Loading, Message } from 'element-ui'
import './style/el-index.less'
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.use(Loading.directive)
export default {
  Input,
  Select,
  Form,
  FormItem,
  Option,
  Dialog,
  InputNumber
}