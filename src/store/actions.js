import * as $http from '@/api'
export const testData =  (store, testData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.commit('setTestData', testData)
      resolve(testData)
    }, testData.time)
  })
}
const requestPost = ({commit, state}, url, params) => {
  return $http.requestPost(url, params)
}
export const post = requestPost
export const queryCategory = ({commit, state}, params) => {
  // return $http.requestPost(url, params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('setCategoryData', {code: 200, message: '成功', data: {cId: params.cId, imgUrl: params.cId == 125 ? '/static/vacuum/Banner.jpg' : '/static/vacuum/dam.jpg'}})
      resolve()
    }, 200)
  })
}
export const queryCategoryList = ({commit, state}) => {
  // return $http.requestPost(url, params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 200)
  })
}
