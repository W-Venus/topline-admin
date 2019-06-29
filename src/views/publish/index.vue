<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
    </div>
    <el-row>
      <el-col>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor
              ref="myTextEditor"
              v-model="form.content"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="封面">
            <!-- <el-radio-group v-model="form.cover">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group> -->
          </el-form-item>
          <el-form-item label="频道">
            <!-- 组件传值
                父传子:props
                子传父:自定义事件
            -->
            <!-- <article-channel
             @input="form.channel_id=$event"
             :value="form.channel_id"
            ></article-channel>
            v-model 就是它俩的简写
             -->
            <article-channel v-model="form.channel_id"></article-channel>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePublish(false)">发表</el-button>
            <el-button @click="handlePublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// 加载富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器
import { quillEditor } from 'vue-quill-editor'
// 加载组件
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'Publish',
  // 注册
  components: {
    ArticleChannel,
    quillEditor
  },
  data () {
    return {
      form: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '', // 频道
        cover: { // 封面  -1:自动，0-无图，1-1张，3-3张
          type: 0,
          images: []
        }
      },
      editorOption: {}
    }
  },
  created () {
    // 判断是否是编辑页面,是编辑页面的话就去发请求
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    // 根据id去查询对应数据,渲染在页面中
    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}` // 获取动态绑定的id
        })
        // console.log(data)
        this.form = data
      } catch (err) {
        this.$message.error('修改失败')
      }
    },
    async handlePublish (draft) {
      try {
        // 判断是编辑页面还是发布页面,编辑页面的话就发修改请求
        if (this.$route.name === 'publish-edit') {
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.form
          })
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
        } else {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.form
          })
          this.$message({
            showClose: true,
            message: '发布成功',
            type: 'success'
          })
        }
      } catch (err) {
        this.$message.error('发布失败')
      }
    }
  }
}
</script>

<style lang="less">
  .ql-container {
      height: 400px;
    }
</style>

<style lang='less' scoped>
  .publish-card {
    height: 100%;
  }
</style>
