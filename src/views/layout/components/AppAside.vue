<template>
    <!--
      el-menu
        active-text-color 激活时候的文本文件
        router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
      el-submenu
       index 用来区分不同的导航项目的，可以用作路由导航路径，必须唯一，否则会出现菜单冲突 -->
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      >
      <el-menu-item index="/">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/media">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">图文数据</el-menu-item>
          <el-menu-item index="1-2">粉丝概况</el-menu-item>
          <el-menu-item index="1-3">粉丝画像</el-menu-item>
          <el-menu-item index="1-4">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AppAside',

  data () {
    return {
    }
  },

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
