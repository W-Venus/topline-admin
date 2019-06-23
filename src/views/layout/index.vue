<template>
  <el-container>
      <!-- 侧边栏 -->
    <el-aside class="aside-left" width="200px">
        <div class="logo">
          <img src="./img/logo_admin.png">
        </div>
        <AppAside/>
    </el-aside>
      <el-container class="container-right">
          <!-- 头部 -->
        <el-header>
            <AppHeader/>
        </el-header>
        <!-- 内容 -->
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
  </el-container>
</template>

<script>
// 加载子组件
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  // 注册子组件
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
  .el-container {
      height: 100%;
    .aside-left {
      background-color: rgb(84,92,100);
      .logo {
          padding: 20px;
        img {
            width: 120px;
        }
     }
   }
   .container-right {
       background-color: rgb(242,243,245);
       .el-header {
           background-color: #fff;
           height: 60px;
           line-height: 60px;
       }
   }
 }

</style>
