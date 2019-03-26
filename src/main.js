// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import Store from './store'
import i18n from './lang' //다국어

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Router,
  Store,
  i18n,
  components: { App },
  template: '<App/>'
})