import Vue from 'vue'
import Vuex from 'vuex'
import { getUser } from '@/utils/auth'

Vue.use(Vuex)

// 可以通过 store.state 来获取状态对象
const store = new Vuex.Store({
  // state 中的数据可以被任何组件访问
  // 在组件中通过this.$store.state.xxx 来访问
  state: {
    user: getUser() || {} // user 的初始数据来自于本地存储
  },
  mutations: {

  }
})

export default store
