import _ from 'lodash'
const getters = {
  language: state => state.app.language,
  device: state => state.app.device,
  roles: state => state.user.roles,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  isLogin: function(state) {
    return !(state.user.token == '' || _.isUndefined(state.user.token) || _.isEmpty(state.user.token))
  }
}
export default getters