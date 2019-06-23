<template>
  <div>
    <el-row class="header">
      <el-col :span="17"><div class="grid-content">江苏传智播客教育科技股份有限公司</div></el-col>
      <el-col :span="3" :offset="4">
        <img class="photo" :src="userInfo.photo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">{{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="iconfont icon-people">个人信息</el-dropdown-item>
          <el-dropdown-item icon="iconfont icon-lianjie">git地址</el-dropdown-item>
          <el-dropdown-item icon="iconfont icon-tuichu">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('user_info'))
  },
  methods: {}
}
</script>

<style lang='less' scoped>
  .photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px
  }
</style>
