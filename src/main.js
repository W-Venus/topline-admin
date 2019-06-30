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
import { getUser, removeUser } from '@/utils/auth'
// 引入jsonbig
import JSONbig from 'json-bigint'
// 引入store
import store from './store'

Vue.config.productionTip = false
// 将axios配置到vue原型中,这样在组件中可以直接使用,不用加载
Vue.prototype.$http = axios
// 配置axios接口路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'

// axios 预留的自定义处理后端返回的原始数据
// 可以理解成又是一个响应拦截器,这里的data是后端返回的未经处理的原始数据
// axios 默认使用JSON.parse 去转换原始数据,如果其中有超出安全整数范围的数据就有问题了
axios.defaults.transformResponse = [function (data) {
  // 类似于JSON.parse,但是它会处理其中超出安全整数范围的整数问题
  try {
    // 如果是json格式字符串,那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错意味着data不是json格式字符串,那就直接原样返回给后续使用
    return data
  }
}]

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

// 配置响应拦截器,统一处理响应的结果,根据接口文档可知,返回结果都是{message:'OK',data:{...}}形式
axios.interceptors.response.use(response => {
  // 判断 response.data是不是一个对象并且里面有没有一个data数据,有的话返回,没有的话返回response.data
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  // 判断,如果错误状态码为401,那么就清除无效的token,然后跳转到登录页
  if (error.response.status === 401) {
    removeUser()
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.use(ElementUI)

new Vue({
  router,
  store, // 配置store
  render: h => h(App)
}).$mount('#app')
