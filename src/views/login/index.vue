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
import axios from 'axios'
// 引入极验文件
import '@/vendor/gt'
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
    handleSendCode () {
      const { mobile } = this.UserForm
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
        // 获取返回结果
        const { data } = res.data
        // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
        window.initGeetest({
        // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏式弹出框验证
        }, function (captchaObj) {
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(function () {
            // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify() // 显示验证码
          }).onSuccess(function () {
            // your code
            // console.log(captchaObj.getValidate())
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } = captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                seccode,
                validate
              }
            }).then(res => {
              console.log(res.data)
            })
          }).onError(function () {
            // your code
          })
        })
      }
      )
    },
    handleLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.UserForm
      })
        .then(res => {
          // console.log(res.data)
          // 登录成功,提示消息
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          // 登录成功跳转首页
          this.$router.push({
            name: 'home'
          })
        })
        .catch((e) => {
        // 登录失败,提示消息
          this.$message.error('登录失败,请检查手机号或验证码')
        })
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
