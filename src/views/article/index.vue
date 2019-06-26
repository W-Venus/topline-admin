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
      <el-table class="table-card" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180"></el-table-column>
        <el-table-column prop="name" label="标题" width="180"></el-table-column>
        <el-table-column prop="name" label="状态" width="180"></el-table-column>
        <el-table-column prop="name" label="发布时间" width="180"></el-table-column>
        <el-table-column prop="name" label="操作" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- /列表部分 -->
    <!-- 分页部分 -->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    <!-- /分页部分 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',

  data () {
    return {
      tableData: []
    }
  },
  created () {
    // 初始化开始就请求数据
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      // 获取token,设置请求头,请求头中设置 Authorization
      const res = await this.$http({
        method: 'GET',
        url: '/articles'
      })
      this.tableData = res.data.data.results
      console.log(res.data.data.results)
    }
  }
}
</script>

<style lang='less' scoped>
  .text {
    font-size: 14px;
  }

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
  }
  .choose-card, .table-card {
    margin-bottom: 20px
  }
</style>
