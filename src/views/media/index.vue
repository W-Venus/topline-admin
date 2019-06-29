<template>
  <el-card class="media-card">
    <div slot='header'>
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-button type="primary">上传图片</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'media',

  data () {
    return {
      active: '全部'
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
  .action {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
  }
</style>
