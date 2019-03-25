import Vue from 'vue'
import Vuex from 'vuex'
import AppStore from './modules/appStore'
import UserStore from './modules/useStorer'
import Getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppStore,
    UserStore
  },
  Getters
})

export default store