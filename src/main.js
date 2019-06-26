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

Vue.config.productionTip = false
// 将axios配置到vue原型中,这样在组件中可以直接使用,不用加载
Vue.prototype.$http = axios
// 配置axios接口路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
