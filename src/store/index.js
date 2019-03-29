import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/appStore'
import user from './modules/useStorer'
import StoreGetter from './sotreGetter'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters: StoreGetter
})

export default store