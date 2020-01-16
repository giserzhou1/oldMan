<template>
  <div class="login-container">
    <el-form ref="loginForm" label-width="auto" class="login-form" size='medium' :model="loginForm" :rules="loginRules">
      <div class="login-error">{{ this. error }}</div>
      <el-form-item class='inputText' prop="email" label="邮箱">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item class='inputText' prop="password" label="密码">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%" native-type="submit" :loading="loading" @click="login">登录</el-button>
      <div class="login-info">如果没有注册账号请<router-link :to="{name: 'regist'}">点击注册</router-link>
      </div>
      <div class="login-info">地图板块<router-link :to="{name: 'map'}">map</router-link> </div>
      <div class="login-info">地图板块<router-link :to="{name: 'number'}">map</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
  import loginApis from '@/util/loginApi'
  export default {
    data() {
      return {
        loading: false,
        error: '',
        loginForm: {
          email: '',
          password: '',
          comparePassword: ''
        },
        loginRules: {
          email: {
            type: 'email',
            required: true,
            message: '请输入有效的邮箱地址',
            trigger: 'blur'
          },
          password: {
            type: 'string',
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        }
      }
    },
    methods: {
      login() {
        let self = this
        this.$refs['loginForm'].validate(async function (valid) {
          if (valid) {
            self.loading = true
            self.error = ''
              loginApis.login({
                'email': self.loginForm.email,
                'password': self.loginForm.password
              }).then((res) => {
                console.log(res)
                if (res.data.code === 201) {
                  self.$store.dispatch('setToken', res.data.token)
                  self.$store.dispatch('setUser', res.data.user.email)
                  self.loading = false
                  self.$router.push('about')
                } else {
                    if(res.data.error){
                       self.error = res.data.error
                    }
                    self.loading = false
                }
              }).catch ((err) => {
              console.log(err)
              self.error = '邮箱账号或密码错误，请修改后再试'
              self.loading = false
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    background: #2d3a4b;

    .login-form {
      width: 100%;
      margin: 10%;
      background: #fff;
      padding: 10%;

      .login-info {
        text-align: right;
        font-size: 0.9rem;
        margin-top: 10px;
        color: #909399;
      }

      .inputText {
        margin-top: 30px;
      }

      .login-error {
        color: #F56C6C;
      }
    }
  }
</style>