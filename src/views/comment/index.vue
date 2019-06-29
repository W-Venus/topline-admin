<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="评论粉丝数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="允许评论">
        <template>
          123
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'comment',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
</style>
