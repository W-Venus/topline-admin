import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '@/utils/auth'

Vue.use(Vuex)

// 可以通过 store.state 来获取状态对象
const store = new Vuex.Store({
  // state 中的数据可以被任何组件访问
  // 在组件中通过this.$store.state.xxx 来访问
  state: {
    user: getUser() || {} // user 的初始数据来自于本地存储
  },
  // 类似组件的methods,定义mutation来修改state状态,在组件中调用mutation函数完成对状态的修改
  // 在组件中调用方法是 this.$store.commit('函数名')
  mutations: {
    // mutations 函数默认接收一个参数,就是state
    // 在这里可以通过 state.xxx = xxx 完成对容器状态的修改
    changeUser (state, user) {
      // 接收修改后的用户信息,在这里对state中的数据进行修改
      // 将后者混入到前者里面,后者会覆盖前者
      Object.assign(state.user, user)
      // 将修改后的数据重新放入本地存储中,更新一下本地存储的信息
      setUser(state.user)
    }
  }
})

export default store
