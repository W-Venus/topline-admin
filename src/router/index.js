import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 给路由起个名字,方便使用
const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
/**
 * to  要去哪里
 * form  从哪里来
 * next 允许通过(访问)的方法
 */
// 配置全局前置守卫.控制页面访问权限
router.beforeEach((to, from, next) => {
  // 获取本地存储中的用户信息,如果有,说明已经登录了
  const userInfo = window.localStorage.getItem('user_info')
  if (to.path !== '/login') {
  // 非登录页面
    if (!userInfo) {
      // 没有登录,跳转到登录页面
      next({ name: 'login' })
    } else {
      // 登录了,允许访问
      next()
    }
  } else {
  // 登录页面
    if (!userInfo) {
    // 没有登录,允许访问
      next()
    } else {
    // 登录了,不允许访问
      window.location.href = '/#/'
      window.location.reload()
    }
  }
})
// 导出路由
export default router
