<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <!-- 评论列表 -->
    <el-table :data="comments">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="评论粉丝数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="允许评论">
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="comment-page"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'comment',

  data () {
    return {
      comments: [],
      value: true
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    // 请求评论列表
    async loadComments () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment'
          }
        })
        // console.log(data.results)
        this.comments = data.results
      } catch (err) {
        this.$message.error('请求评论列表失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .comment-page {
     margin-top: 20px;
     text-align: center;
 }
</style>
