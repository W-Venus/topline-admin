<template>
  <div>
    <!-- 筛选部分 -->
    <el-card class="choose-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
    <!-- /筛选部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一共找到xxx条数据</span>
      </div>
    <!-- 列表部分 -->
    <!--  slot-scope  固定属性名   scope.row  就是当前遍历对象,就像item一样 -->
      <el-table class="table-card" :data="articles" style="width: 100%">
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <img
             v-for="item in scope.row.cover.images"
             :key="item"
             :src="item"
             width="30">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">
              {{ statTypes[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="180"></el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <el-button size="mini" type="primary" plain>修改</el-button>
          <el-button size="mini" type="danger" plain>删除</el-button>
        </el-table-column>
      </el-table>
    <!-- /列表部分 -->
    <!-- 分页部分 -->
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount"
      @current-change="handleCurrentChange"
      ></el-pagination>
    <!-- /分页部分 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',

  data () {
    return {
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, // 每页十条
      totalCount: 0, // 文章总数
      page: 1 // 默认为1
    }
  },
  created () {
    // 初始化开始就请求数据
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      // 获取token,设置请求头,请求头中设置 Authorization
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页码
          per_page: this.pageSize // 请求参数,请求每页多少条
        }
      })
      // console.log(data.results)
      this.articles = data.results
      this.totalCount = data.total_count
    },
    handleCurrentChange (page) {
      // console.log(page)
      // 将点击的当前页码,传给请求的参数页码,获取当页数据
      this.page = page
      // 重新加载列表
      this.loadArticles()
    }
  }
}
</script>

<style lang='less' scoped>
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
    .el-pagination {
      text-align: center;
    }
  }
  .choose-card, .table-card {
    margin-bottom: 20px
  }
</style>
