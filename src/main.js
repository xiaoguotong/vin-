// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vinKeyBoard from './lib/index.js'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(vinKeyBoard);

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
