<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
    </div>
    <el-row>
      <el-col :span="10">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="form.region">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发表</el-button>
            <el-button>存入草稿</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Publish',

  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },

  methods: {
    onSubmit () {}
  }
}
</script>

<style lang='less' scoped>
  .publish-card {
    height: 100%;
  }
</style>
