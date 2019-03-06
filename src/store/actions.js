import * as $http from '@/api'
export const testData =  (store, testData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.commit('setTestData', testData)
      resolve(testData)
    }, testData.time)
  })
}
const requestPost = ({ state }, params) => {
  return $http.requestPost(params.api, params.data || {}, state)
}
const requestGet = ({ state }, params) => {
  return $http.requestGet(params.api, params.data || {}, state)
}
export const postFetch = requestPost // 公共post请求
export const getFetch = requestGet // 公共get请求
export const getByUrl = ({ state }, params) => { // 公共get请求--参数拼到url后的
  return $http.fetchGet(params.api, params.data, state)
}

export const queryCategoryList = ({commit, state}) => { // 获取分类
  return new Promise((resolve, reject) => {
    $http.requestGet('getCategory', {}, state).then(data => {
      commit('setCategoryList', data)
      $http.requestGet('selectDicTreeVoList', {}, state).then(data => {
        commit('setDicTreeList', data)
        resolve()
      }).catch(err => { reject(err) })
    }).catch(error => { reject(error) })
  })
}

export const emailSubscribe = ({state}, params) => { // 邮件订阅
  return new Promise((resolve, reject) => {
    $http.requestPost('sendEmail', params, state).then(data => {
      resolve(data)
    }).catch(error => { reject(error) })
  })
}

