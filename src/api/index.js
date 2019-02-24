import axios from 'axios'
import api from './api'

axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout = 10000
axios.defaults.headers['x-language'] = 'zh-CN'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

//post请求
export function requestPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(api[url], params).then(response => { resolve(response.data) }).catch(error => { reject(error) })
  })
}

//get请求
export function requestGet (url) {
  return new Promise((resolve, reject) => {
    axios.get(api[url]).then(response => { resolve(response.data) }).catch(error => { reject(error) })
  })
}
