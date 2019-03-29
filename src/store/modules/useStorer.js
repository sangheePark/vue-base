import request from '@/utils/request'
import { SET_TOKEN, SET_REFRESH_TOKEN, SET_ROLES } from './userMutationType'
import VueJwtDecode from 'vue-jwt-decode'

const user = {
  state: {
    user: '',
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('token'),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_REFRESH_TOKEN](state, refreshToken) {
      state.refreshToken = refreshToken
    },
    [SET_ROLES](state, roles) {
      state.roles = roles
    }
  },
  actions: {
    login(state, userInfo) {
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

          state.commit(SET_TOKEN, data.token)
          state.commit(SET_REFRESH_TOKEN, data.refreshToken)
          state.commit(SET_ROLES, decodeToken.scopes)

          localStorage.setItem('token', data.token)
          localStorage.setItem('refreshToken', data.refreshToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user