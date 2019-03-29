import Cookies from 'js-cookie'
import { SELECT_LANG } from './appMutationType'


const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'ko',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    [SELECT_LANG](state, language) {
      state.language = language
    }
  },
  actions: {}
}

export default app