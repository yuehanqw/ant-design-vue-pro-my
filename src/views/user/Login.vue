<template>
  <div class="main">
    <a-form-model ref="form" :model="model" :rules="rules" class="user-layout-login">
      <a-form-model-item prop="username">
        <a-input v-model="model.username" size="large" type="text">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input-password v-model="model.password" size="large">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-model-item>
      <a-row>
        <a-col :span="16">
          <a-form-model-item prop="inputCode">
            <a-input v-model="model.inputCode" size="large" type="text" placeholder="请输入验证码">
              <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="text-align: right;">
          <img v-if="model.requestCodeSuccess" style="margin-top: 2px;" :src="model.randCodeImage"
               @click="handleChangeCheckCode" />
          <img v-else style="margin-top: 2px;" src="../../assets/checkcode.png" @click="handleChangeCheckCode" />
        </a-col>
      </a-row>
      <a-form-model-item>
        <a-checkbox v-model="model.remember">自动登录</a-checkbox>
        <router-link
          :to="{ name: 'recover'}"
          class="forge-password"
          style="float: right;"
        >忘记密码
        </router-link>
        <router-link
          :to="{ name: 'register' }"
          class="register"
          style="float: right;margin-right:10px;"
        >注册账户
        </router-link>
      </a-form-model-item>


      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          @click.stop="handleSubmit"
        >登录
        </a-button>
      </a-form-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getAction, postAction } from '@/api/api'

export default {
  name: 'Login',
  data() {
    return {
      model: {
        username: 'admin',
        password: 'NT123!@#<>',
        inputCode: '',
        remember: true,
        currdatetime: '', // 当前时间
        requestCodeSuccess: false, // 拿到验证码图片
        randCodeImage: '' // 验证码图片
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' }
        ],
        inputCode: [
          { required: true, message: '请输入验证码!', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.handleChangeCheckCode()
  },
  methods: {
    /** 刷新验证码 */
    handleChangeCheckCode() {
      this.model.currdatetime = new Date().getTime()
      this.model.inputCode = ''
      getAction(`/port/sys/randomImage/${this.model.currdatetime}`).then(res => {
        if (res.success) {
          this.model.randCodeImage = res.result
          this.model.requestCodeSuccess = true
        } else {
          this.$message.error(res.message)
          this.model.requestCodeSuccess = false
        }
      }).catch(() => {
        this.model.requestCodeSuccess = false
      })
    },
    /** 提交*/
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const loginParams = {
            username: this.model.username,
            password: this.model.password,
            captcha: this.model.inputCode,
            checkKey: this.model.currdatetime,
            remember_me: this.model.remember
          }
          postAction('/port/sys/login', loginParams).then(res => {
            if (res.code === 200) {
              this.loginSuccess(res)
            } else {
              this.requestFailed(res.message)
            }
          }).catch(_ => this.requestFailed())
        }
      })
    },
    loginSuccess(res) {
      this.SetToken({ remember: this.model.remember, value: res.result.token })
      this.SetUserInfo({ remember: this.model.remember, value: res.result.userInfo })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
      this.$router.push('/dashboard/workplace')
    },
    requestFailed(message) {
      this.$notification['error']({
        message: '登录失败',
        description: message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },
    ...mapActions('user', [
      'SetToken',
      'SetUserInfo'
    ])
  }
}
</script>

<style scoped lang="less">
.user-layout-login {
  label {
    font-size: 14px;
  }
  .forge-password {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
