// element-ui组件管理
import Vue from 'vue'
import { Input, Select, Form, FormItem, Option, Dialog, MessageBox, InputNumber, Loading } from 'element-ui'
import './style/el-index.less'
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
export default {
  Input,
  Select,
  Form,
  FormItem,
  Option,
  Dialog,
  InputNumber
}