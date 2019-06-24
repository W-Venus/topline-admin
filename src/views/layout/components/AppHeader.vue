<template>
  <div>
    <el-row class="header">
      <el-col :span="17"><div class="grid-content"><i class="iconfont icon-ma1"></i>江苏传智播客教育科技股份有限公司</div></el-col>
      <el-col :span="3" :offset="4">
        <img class="photo" :src="userInfo.photo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">{{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="iconfont icon-ren1">个人信息</el-dropdown-item>
          <el-dropdown-item icon="iconfont icon-lianjie">git地址</el-dropdown-item>
          <el-dropdown-item icon="iconfont icon-tuichu" @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 加载auth.js
import { getUser, removeUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    // 使用模块化的本地存储
    this.userInfo = getUser()
  },
  methods: {
    handleLogout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清除本地存储中的用户信息
        // window.localStorage.removeItem('user_info')
        removeUser()
        // 跳转回登录页
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
   i {
     margin-right: 10px
  }
  .photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px
  }
</style>
