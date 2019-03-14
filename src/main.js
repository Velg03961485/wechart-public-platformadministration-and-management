// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/iconfont.css'
import '../static/css/home.css'
import '../static/css/main.css'
import '../static/font/iconfont.css'
//引入富文本
import VueQuillEditor from 'vue-quill-editor'

import http from './api/http.js'

import App from './App'
import router from './router'
// import axios from 'axios'
import * as filters from './filters'
import './config/constants'
import Moment from 'moment'
import globalFunction from '@/assets/js/globalFunction'
//把左侧菜单的show挂载在全局
import global_ from './global/Global'
//因为VueQuillEditor升级问题，要单独把样式引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import getBytesLength from '@/global/getBytesLength'
Vue.prototype.GLOBAL = global_     //挂载到Vue实例上面
Vue.prototype.moment = Moment

Vue.use(globalFunction);
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(getBytesLength);
Vue.filter('date', filters.dateFilter)
Vue.filter('timeType', filters.timeTypeFilter)
Vue.filter('fontLength', filters.fontFilter)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
