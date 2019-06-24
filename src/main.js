import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 配置element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import './styles/index.less'
// 引入进度条样式
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
