<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png">
      </div>
       <el-form class="login-form" ref="form" :model="UserForm">
        <el-form-item>
          <el-input v-model="UserForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
          <el-col :span="17">
          <el-input v-model="UserForm.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-button @click="handleSendCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
         <el-form-item class="form-argee">
          <el-checkbox-group v-model="UserForm.type">
            <el-checkbox name="type">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="form-btn" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      UserForm: {
        mobile: '',
        code: '',
        type: ''
      }
    }
  },

  methods: {
    handleLogin () {
      console.log('123')
    },
    handleSendCode () {

    }
  }
}
</script>

<style lang='less' scoped>
.login-wrap {
  height: 100%;
  background-image: url(./login_bg.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  .form-wrap {
    width: 490px;
    height: 300px;
    background-color: #fff;
    text-align: center;
    padding: 40px;
    .form-btn {
      width: 100%;
    }
    .form-argee {
      text-align: left;
      a {
        text-decoration: none;
        color: rgb(102,177,255);
      }
    }
    .form-head {
      margin-bottom: 15px;
    }
  }
}
</style>
