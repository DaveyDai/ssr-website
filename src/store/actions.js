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
  return $http.requestPost(params.api, params.data || {}, state.token || '')
}
const requestGet = ({ state }, params) => {
  return $http.requestGet(params.api, params.data || {}, state.token || '')
}
export const postFetch = requestPost // 公共post请求
export const getFetch = requestGet // 公共get请求
export const getByUrl = ({ state }, params) => { // 公共get请求--参数拼到url后的
  return $http.fetchGet(params.api, params.data, state.token || '')
}
export const queryCategoryList = ({commit, state}, { language }) => { // 获取分类
  return new Promise((resolve, reject) => {
    $http.requestGet('getCategory', {}, state.token || '', language).then(data => {
      commit('setCategoryList', data)
      $http.requestGet('selectDicTreeVoList', {}, state.token || '', language).then(data => {
        commit('setDicTreeList', data)
        resolve()
      }).catch(err => { resolve(err) })
    }).catch(error => {
      reject(error)
    })
  })
}

