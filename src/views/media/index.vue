<template>
  <el-card class="media-card">
    <div slot='header'>
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <!-- el-radio-button 组件无法注册原生click事件,所以需要使用.native 修饰符 -->
        <el-radio-button label="全部" @click.native="loadPhoto(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadPhoto(true)"></el-radio-button>
      </el-radio-group>
      <!-- name  字段名
          action 上传地址
          headers  请求头
          因为这个组件支持默认的post上传事件,所以使用组件上传,
          可以直接在组件中配置,配置以上三个字段
       -->
      <el-upload
        name="image"
        :headers="{Authorization :`Bearer ${$store.state.user.token}`}"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        >
        <el-button size="middle" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" style="margin-bottom: 10px;" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" class="photo-card">
          <img :src="item.url" class="image" style="max-width: 100%;">
          <div>
            <div class="bottom clearfix">
              <el-button type="primary" :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" circle @click="handleCollect(item)"></el-button>
              <el-button type="primary" icon="el-icon-delete" circle @click="handleDelete(item)"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      class="media-page"
      background
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'media',

  data () {
    return {
      active: '全部',
      images: [],
      page: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  created () {
    this.loadPhoto()
  },
  methods: {
    // 点击哪一页,就让哪一页高亮显示
    handleCurrentChange (page) {
      this.page = page
      // 重新加载图片列表
      this.loadPhoto()
    },
    // 上传图片
    handleUploadSuccess () {
      // 上传成功,重新加载列表
      this.loadPhoto()
    },
    // 删除图片
    async handleDelete (item) {
      try {
        await this.$http({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loadPhoto()
      } catch (err) {
        this.$message.error('删除失败')
      }
    },
    // 收藏图片
    async handleCollect (item) {
      // !item.is_collected 表示,点击前是true的话,点击之后应该是false
      const collect = !item.is_collected
      try {
        const data = await this.$http({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
            collect
          }
        })
        // console.log(data)
        // 图标的样式随着点击的变化而变化
        item.is_collected = data.collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
        // this.loadPhoto()
      } catch (err) {
        this.$message.error('收藏失败')
      }
    },
    // 加载图片列表
    async loadPhoto (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/images',
          params: {
            collect,
            page: this.page,
            per_page: this.pageSize
          }
        })
        console.log(data)
        this.totalCount = data.total_count
        this.images = data.results
      } catch (err) {
        this.$message.error('加载图片列表失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .action {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .bottom {
    display: flex;
    justify-content: center;
  }
  .image {
    width: 100%;
  }
  .photo-card {
    width: 200px;
  }
  .media-page {
    text-align: center;
  }
</style>
