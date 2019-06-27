<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="form-head">
        <img src="./img/logo_index.png">
      </div>
       <el-form class="login-form" ref="form" :model="UserForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="UserForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
          <el-col :span="17">
          <el-input v-model="UserForm.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-button id="SendBtn" @click="handleSendCode" :loading="codeLoading">获取验证码</el-button>
          </el-col>
        </el-form-item>
         <el-form-item class="form-argee" prop="type">
          <el-checkbox-group v-model="UserForm.type">
            <el-checkbox name="type">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="form-btn" type="primary" @click="handleLogin" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// 引入极验文件
import '@/vendor/gt'
import initGeetest from '@/utils/init-geetest'
// 引入模块化本地存储
import { setUser } from '@/utils/auth'
export default {
  name: 'AppLogin',
  data () {
    return {
      UserForm: {
        mobile: '13911111111',
        code: '246810',
        type: true
      },
      loginLoading: false, // 登录按钮加载中
      codeLoading: false, // 验证码按钮加载中
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /\d{6}/, message: '请输入有效的验证码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 封装发送验证码的函数
    async showGeeTest () {
      try {
        const { mobile } = this.UserForm
        const data = await this.$http({
          method: 'GET',
          url: `/captchas/${mobile}`
        })
        // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
        const captchaObj = await initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏式弹出框验证
        })
        // 这里可以调用验证实例 captchaObj 的实例方法
        captchaObj.onReady(() => {
          // 验证码ready之后才能调用verify方法显示验证码
          captchaObj.verify() // 显示弹框验证码
        }).onSuccess(async () => {
          // console.log(captchaObj.getValidate())
          // 验证成功,输出的结果提取转变为短信接口要接收的参数形式
          const {
            geetest_challenge: challenge,
            geetest_seccode: seccode,
            geetest_validate: validate } = captchaObj.getValidate()
          // 向短信接口发送请求
          await this.$http({
            method: 'GET',
            url: `/sms/codes/${mobile}`,
            params: {
              challenge,
              seccode,
              validate
            }
          })
          // console.log(res.data) // 返回发送短信时的手机号
          // 调用倒计时函数
          this.codeCountDown()
          // 倒计时开始,让验证码按钮开始显示加载中
          this.codeLoading = true
        })
      } catch (err) {
        this.$message.error('发送验证码失败')
      }
    },
    // 发送验证码时验证手机号
    handleSendCode () {
      this.$refs['form'].validateField('mobile', errorMessage => {
        // console.log(errorMessage)
        // 判断,手机号输入正确,errorMessage 是空,输入错误,errorMessage是 '请输入手机号',所以这里判断长度
        if (errorMessage.trim().length > 0) {
          return
        }
        // 调用发送验证码
        this.showGeeTest()
      })
    },
    // 封装倒计时功能
    codeCountDown () {
      var oBtn = document.getElementById('SendBtn')
      var flag = true
      var time = 60
      oBtn.classList.add('disable')
      oBtn.innerText = '已发送'
      if (flag) {
        flag = false
        var timer = setInterval(() => {
          time--
          oBtn.innerText = time + ' 秒'
          if (time === 0) {
            clearInterval(timer)
            oBtn.innerText = '点击重新获取'
            oBtn.classList.remove('disable')
            flag = true
            // 倒计时结束,让验证码按钮停止显示加载中,放开按钮
            this.codeLoading = false
          }
        }, 1000)
      }
    },
    // 对整个表单进行验证
    handleLogin () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return
        }
        // 调用登录功能
        this.submitLogin()
      })
    },
    // 封装登录功能
    async submitLogin () {
      try {
        // if (this.UserForm.type !== true) {
        //   this.$message({
        //     showClose: true,
        //     message: '请勾选协议',
        //     type: 'warning'
        //   })
        //   return
        // }
        // 点击登录,开始加载
        this.loginLoading = true
        const userInfo = await this.$http({
          method: 'POST',
          url: '/authorizations',
          data: this.UserForm // 表单同步的手机号和验证码
        })
        // .then(res => { // 状态码>=200 <400时,进入这里,表示登录成功
        // 登录成功跳转首页
        this.$router.push({
          name: 'home'
        })
        // 登录成功,提示消息
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 登录成功,使用localStorage保存用户信息
        // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
        setUser(userInfo)
        // 登录成功,停止加载
        this.loginLoading = false
      } catch {
        // 登录失败,提示消息
        this.$message.error('登录失败,请检查手机号或验证码')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-wrap {
  height: 100%;
  background-image: url(./img/login_bg.jpg);
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
