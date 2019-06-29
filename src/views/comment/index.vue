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
        <template slot-scope="scope">
          <!-- disabled 控制开关的禁用状态 -->
          <el-switch
          :disabled="scope.row.disabled"
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleStatus(scope.row)"
          ></el-switch>
        </template>
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
      comments: []
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
        // 手动添加一个disabled属性,用来控制开关的禁用状态
        data.results.forEach(item => {
          item.disabled = false
        })
        // console.log(data.results)
        this.comments = data.results
      } catch (err) {
        this.$message.error('请求评论列表失败')
      }
    },
    // 修改评论状态
    async handleStatus (item) {
      // console.log(item)
      try {
        // 发请求的时候禁用开关
        item.disabled = true
        await this.$http({
          method: 'PUT',
          url: '/comments/status',
          params: {
            article_id: item.id.toString() // 将id转为字符串
          },
          data: {
            allow_comment: item.comment_status // 当前开关的状态
          }
        })
        // 请求结束的时候开启开关
        item.disabled = false
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁用'}按钮成功`
        })
      } catch (err) {
        this.$message.error('操作失败')
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
