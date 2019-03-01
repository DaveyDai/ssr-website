import axios from 'axios'
import api from './api'

axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout = 5000
axios.defaults.headers['accept-language'] = 'l_en'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

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
export function requestPost (url, params, token) {
  axios.defaults.headers['token'] = token
  return new Promise((resolve, reject) => {
    console.log('post请求:', api[url])
    axios.post(api[url], params).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
    }).catch(error => {
      console.log('server is error:', error.response)
      try{
        reject(error.response.data)
      } catch (errpr) {
        console.log('后台服务请求异常！')
        reject(error)
      }
    })
  })
}

//get请求
export function requestGet (url, params, token) {
  axios.defaults.headers['token'] = token
  return new Promise((resolve, reject) => {
    let getUrl = api[url]
    console.log('get请求:', getUrl)
    axios.get(getUrl).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
    }).catch(error => {
      console.log('server is error:', error.response)
      try{
        reject(error.response.data)
      } catch (errpr) {
        console.log('后台服务请求异常！')
        reject(error)
      }
    })
  })
}

//get请求 url拼接的
export function fetchGet (url, params, token) {
  axios.defaults.headers['token'] = token
  return new Promise((resolve, reject) => {
    let getUrl = api[url] + params
    console.log('get请求:', getUrl)
    axios.get(getUrl).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
    }).catch(error => {
      console.log('server is error:', error.response)
      try{
        reject(error.response.data)
      } catch (errpr) {
        console.log('后台服务请求异常！')
        reject(error)
      }
    })
  })
}
