<template>
  <div class="login">
    <el-form ref="form" label-width="70px" :inline='true' class="login-container" :model="form" :rules="rules">
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入账号" v-model="form.username">123</el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" style="margin-left: 105px; margin-top: 10px;" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    submit(){
      //校验form表单
      this.$refs.form.validate((valid)=>{
        if(valid){
          getMenu(this.form).then(({data})=>{
            if(data.code === 20000){
              //录入token，username
              Cookie.set('username',JSON.stringify(this.form.username))
              Cookie.set('token',data.data.token)
              //获取接口中的菜单数据
              this.$store.commit('SETMENU',data.data.menu)
              this.$store.commit('ADDMENU',this.$router)
              //验证成功跳转首页
              this.$router.push('/home')
            }else{
              this.$message.error(data.data.message)
            }
          })
        }
      })
    }
  },
};
</script>

<style scoped>
.login-container{
  width: 360px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
}
.login-container .el-inline{
  widows: 198px; 
}
.login-container .login-title{
  text-align: center;
  margin-bottom: 40px;
  color: #505458;
}
</style>