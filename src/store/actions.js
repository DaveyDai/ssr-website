import * as $http from '@/api'
export const testData =  (store, testData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.commit('setTestData', testData)
      resolve(testData)
    }, testData.time)
  })
}
const requestPost = ({commit, state}, params) => {
  return $http.requestPost(params.api, params.data || {}, state.token || '')
}
const requestGet = ({commit, state}, params) => {
  return $http.requestGet(params.api, params.data || {}, state.token || '')
}
export const postFetch = requestPost
export const getFetch = requestGet
export const queryCategory = ({commit, state}, params) => {
  // return $http.requestPost(url, params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('setCategoryData', {code: 200, message: '成功', data: {cId: params.cId, imgUrl: params.cId == 125 ? '/static/vacuum/Banner.jpg' : '/static/vacuum/dam.jpg'}})
      resolve()
    }, 200)
  })
}
export const queryCategoryList = ({commit, state}, { store, route }) => {
  return new Promise((resolve, reject) => {
    $http.requestGet('getCategory', {}, state.token || '').then(data => {
      commit('setCategoryList', data.data)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
