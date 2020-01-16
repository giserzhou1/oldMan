<template>
  <div class="regist-container">
    <el-form
      ref="registForm"
      label-width="auto"
      status-icon 
      class="demo-ruleForm"
      size = 'medium'
      :model="registForm"
      :rules="registRules"
    >
      <div class="regist-error">{{ this. error }}</div>
      <el-form-item class='inputText' prop="email" label="邮箱">
        <el-input v-model="registForm.email"></el-input>
      </el-form-item>
      <el-form-item class='inputText' prop="password" label="密码">
        <el-input v-model="registForm.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item class='inputText' prop="checkPassword" label="确认密码">
        <el-input v-model="registForm.checkPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit" @click="regist">注册</el-button>
      <el-button @click="resetForm('registForm')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
import loginApis from '@/util/loginApi'

export default {
  data () {
       let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registForm.checkPassword !== '') {
            this.$refs.registForm.validateField('checkPassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      error: '',
      registForm: {
        email: '',
        password: '',
        checkPassword: ''
      },
      registRules: {
        email: [{ type: 'email', required: true, message: '请输入有效的邮箱地址', trigger: 'blur' }],
        password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
    regist () {
      let self = this
      this.$refs['registForm'].validate(function(valid){
        if (valid) {
          self.error = ''
          let registUser = {
                'email': self.registForm.email,
                'password': self.registForm.password
              }
          loginApis.regist(
                   registUser
            )
            .then((res) => {
              if (res.data.code === 201) {
              self.$store.dispatch('setToken', res.data.token)
              self.$store.dispatch('setUser', res.data.user.email) 
            }})
            .then(()=>{
                    self.$message({
                      message: '恭喜您，注册成功，即将跳转首页.....',
                      type: 'success'
                    })   
                    setTimeout(function(){ 
                      self.$router.push('about')},3000) 
            })
            .catch((err)=> {
                  console.log(err)
                  self.error = '该账号已注册'
                }
            )
        }
      })
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="scss" scoped>
  
</style>