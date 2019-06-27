<template>
  <div>
    <!-- 筛选部分 -->
    <el-card class="choose-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="">全部</el-radio>
            <el-radio
              v-for="(item, index) in statTypes"
              :key="index"
              :label="index"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="filterParams.channel_id" clearable>
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="handleDateChange"
              v-model="range_date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleFiterParams">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- /筛选部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到<strong>{{ totalCount }}</strong>条数据</span>
      </div>
      <!-- 列表部分 -->
      <!--  slot-scope  固定属性名   scope.row  就是当前遍历对象,就像item一样 -->
      <el-table class="table-card" :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column label="封面" width="350">
          <template slot-scope="scope">
            <img
             v-for="item in scope.row.cover.images"
             :key="item"
             :src="item"
             width="200">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column label="状态" width="300">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">
              {{ statTypes[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="300"></el-table-column>
        <el-table-column prop="name" label="操作" width="350">
          <el-button size="mini" type="primary" plain>修改</el-button>
          <el-button size="mini" type="danger" plain>删除</el-button>
        </el-table-column>
      </el-table>
      <!-- /列表部分 -->
      <!-- 分页部分 current-page="page" 表示随着页数的变化,对应页码高亮显示 -->
      <el-pagination
      :current-page="page"
      :disabled="loading"
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
      page: 1, // 默认为1
      loading: false, // 加载中
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 文章id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      range_date: '', // 时间绑定值,在这里无意义,为了触发日期选择器的change事件
      channels: [] // 频道数据
    }
  },
  created () {
    // 初始化开始就请求文章内容列表数据
    this.loadArticles()
    // 请求频道数据
    this.loadChannels()
  },
  methods: {
    // 点击筛选,根据表单数据去查询内容列表
    handleFiterParams () {
      // 查询从第一页开始加载数据
      this.page = 1
      // 加载内容列表
      this.loadArticles()
    },
    // 监听日期选择器,获取相应数据
    handleDateChange (value) {
      // console.log(value)
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },
    // 请求频道数据
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        //  console.log(channels)
        this.channels = data.channels
      } catch (err) {
        this.$message.error('请求错误')
      }
    },
    // 请求加载内容列表
    async loadArticles () {
      // 请求开始,开始加载中
      this.loading = true
      // 去除提交的表单数据中的无用字段
      const filterData = {}
      // 循环filterParams
      for (let key in this.filterParams) {
        // 定义变量接收filterParams中的数据
        const item = this.filterParams[key]
        if (item !== null && item !== undefined && item !== '') {
          filterData[key] = item
        }
      }
      // 获取token,设置请求头,请求头中设置 Authorization
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页码
          per_page: this.pageSize, // 请求参数,请求每页多少条
          ...filterData // es6对象混入语法 表示将filterData 混入当前对象中,并返回当前对象
        }
      })
      // console.log(data.results)
      this.articles = data.results
      this.totalCount = data.total_count
      // 请求结束,停止加载
      this.loading = false
    },
    // 页码改变时请求相应页码的数据
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
