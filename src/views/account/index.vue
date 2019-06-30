<template>
  <el-card class="account-card">
    <div slot="header">
        <span>个人信息</span>
    </div>
    <el-row>
       <el-col :span="10">
        <el-form :model="user" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input v-model="user.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="绑定手机" >
            <el-input v-model="user.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editUser">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10" :offset="3">
        <p>用户头像</p>
        <!--
          action  必选参数,上传的地址
          http-request  覆盖默认的上传行为,自定义上传方式
          show-file-list是否显示已上传文件列表
           -->
        <el-upload
          :http-request="handleUp"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
        >
        <img v-if="user.photo" :src="user.photo" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>更换头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'account',

  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    // 上传头像
    // axios 上传文件
    async handleUp (uploadConfig) {
      try {
        // 1. 构建一个formdata对象
        //    将文件添加到formdata对象中
        const formData = new FormData()
        formData.append('photo', uploadConfig.file)
        // 2. 发起请求，将 FormData 对象作为 axios 的 data 请求体
        const data = await this.$http({
          method: 'PATCH',
          url: '/user/photo',
          data: formData
        })
        // console.log(data)
        this.user.photo = data.photo
        // 调用mutation函数
        this.$store.commit('changeUser', this.user)
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } catch (err) {
        this.$message.error('上传失败')
      }
    },
    // 编辑用户资料
    async editUser () {
      try {
        const data = await this.$http({
          method: 'PATCH',
          url: '/user/profile',
          data: this.user
        })
        // console.log(data)
        // 调用mutation函数,将修改后的用户信息传到mutation函数中,
        // mutation函数中接收数据然后进行修改
        this.$store.commit('changeUser', data)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      } catch (err) {
        this.$message.error('保存失败')
      }
    },
    // 加载用户信息
    async loadUser () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/profile'
        })
        // console.log(data)
        this.user = data
      } catch (err) {
        this.$message.error('请求失败')
      }
    }
  }
}
</script>

<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang='less' scoped>

</style>
