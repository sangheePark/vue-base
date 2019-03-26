import Vue from 'vue'
import Vuex from 'vuex'
import AppStore from './modules/appStore'
import UserStore from './modules/useStorer'
import StoreGetter from './sotreGetter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppStore,
    UserStore
  },
  StoreGetter
})

export default store