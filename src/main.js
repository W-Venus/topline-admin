import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 配置element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import './styles/index.less'
// 引入进度条样式
import 'nprogress/nprogress.css'
import { getUser } from '@/utils/auth'

Vue.config.productionTip = false
// 将axios配置到vue原型中,这样在组件中可以直接使用,不用加载
Vue.prototype.$http = axios
// 配置axios接口路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'

// 配置请求拦截器,统一处理token,方便后续使用
axios.interceptors.request.use(config => {
  const user = getUser()
  // 判断 是否有user用户信息,有的话就设置
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config // 允许请求发送的开关
}, error => {
  return Promise.reject(error)
})

// 配置响应拦截器,统一处理响应的结果
// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
