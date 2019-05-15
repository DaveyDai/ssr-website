import axios from 'axios'
import api from './api'

axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout = 5000
axios.defaults.headers['accept-language'] = 'l_en'
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
export function requestPost (url, params, state) {
  axios.defaults.headers['token'] = state.token || ''
  axios.defaults.headers['accept-language'] = state.language || 'l_en'
  axios.defaults.timeout = typeof window === 'undefined' ? 5000 : 10000
  return new Promise((resolve, reject) => {
    axios.post(api[url], params).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
      if (typeof window === 'undefined') console.log('post请求:' + api[url], response.data)
    }).catch(error => {
      console.log('server is error:', error)
      try{
        error.response && error.response.status ? reject(Object.assign(error.response.data, {status: error.response.status})) : reject(error.response.data)
      } catch (err) {
        console.log('后台服务请求异常:', error)
        reject(error)
      }
    })
  })
}

//get请求
export function requestGet (url, params, state) {
  axios.defaults.headers['token'] = state.token || ''
  axios.defaults.headers['accept-language'] = state.language || 'l_en'
  axios.defaults.timeout = typeof window === 'undefined' ? 5000 : 10000
  return new Promise((resolve, reject) => {
    let getUrl = api[url]
    axios.get(getUrl).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
      if (typeof window === 'undefined') console.log('get请求:' + getUrl, response.data)
    }).catch(error => {
      console.log('server is error:', error)
      try{
        error.response && error.response.status ? reject(Object.assign(error.response.data, {status: error.response.status})) : reject(error.response.data)
      } catch (err) {
        console.log('后台服务请求异常:', error)
        reject(error)
      }
    })
  })
}

//get请求 url拼接的
export function fetchGet (url, params, state) {
  axios.defaults.headers['token'] = state.token || ''
  axios.defaults.headers['accept-language'] = state.language || 'l_en'
  axios.defaults.timeout = typeof window === 'undefined' ? 5000 : 10000
  return new Promise((resolve, reject) => {
    let getUrl = api[url] + params
    axios.get(getUrl).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
      if (typeof window === 'undefined') console.log('get请求:' + getUrl, response.data)
    }).catch(error => {
      console.log('server is error:', error)
      try{
        error.response && error.response.status ? reject(Object.assign(error.response.data, {status: error.response.status})) : reject(error.response.data)
      } catch (err) {
        console.log('后台服务请求异常:', error)
        reject(error)
      }
    })
  })
}

// post请求 url拼接的
export function fetchPost (url, params, bodyParams, state) {
  axios.defaults.headers['token'] = state.token || ''
  axios.defaults.headers['accept-language'] = state.language || 'l_en'
  axios.defaults.timeout = typeof window === 'undefined' ? 5000 : 10000
  return new Promise((resolve, reject) => {
    let getUrl = api[url] + params
    axios.post(getUrl, bodyParams).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
      if (typeof window === 'undefined') console.log('get请求:' + getUrl, response.data)
    }).catch(error => {
      console.log('server is error:', error)
      try{
        error.response && error.response.status ? reject(Object.assign(error.response.data, {status: error.response.status})) : reject(error.response.data)
      } catch (err) {
        console.log('后台服务请求异常:', error)
        reject(error)
      }
    })
  })
}

// 文件服务
export function uploadFile (fileData, state) {
  axios.defaults.headers['token'] = state.token || ''
  axios.defaults.headers['accept-language'] = state.language || 'l_en'
  axios.defaults.timeout = 30000
  return new Promise((resolve, reject) => {
    let param = new FormData() // 创建form对象
    param.append('multipartFileName', fileData.file)
    axios.post(api.uploadFile + (fileData.type || 0), param, {headers:{'Content-Type':'multipart/form-data'}}).then(response => {
      response.data.code === 200 ? resolve(response.data.data) : reject(response.data)
      if (typeof window === 'undefined') console.log('post请求:' + api[url], response.data)
    }).catch(error => {
      console.log('server is error:', error)
      try{
        error.response && error.response.status ? reject(Object.assign(error.response.data, {status: error.response.status})) : reject(error.response.data)
      } catch (err) {
        console.log('后台服务请求异常:', error)
        reject(error)
      }
    })
  })
}