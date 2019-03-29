import request from '@/utils/request'
import _ from 'lodash'
import store from '@/store'
import VueJwtDecode from 'vue-jwt-decode'

export function isLogin() {
  return !(_.isUndefined(localStorage.getItem('token')) || _.isNull(localStorage.getItem('token')) || _.isEmpty(localStorage.getItem('token')))
}

export function doLogin(userInfo) {
  const username = userInfo.username.trim()
  const password = userInfo.password.trim()
  return new Promise((resolve, reject) => {
    const data = {
      username,
      password
    }

    request({
      url: '/api/sign',
      method: 'post',
      data
    }).then(response => {
      const data = response.data
      const decodeToken = VueJwtDecode.decode(data.token)
      store.dispatch('Login', decodeToken)
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export function doLogout() {
  store.dispatch('LogOut')
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}
