<template>
  <div class="header">
    <div class="header-left">
      <el-button
        @click="changeMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown @command="headerButton">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/header.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { mapState } from 'vuex'
export default {
  name: "Header",
  methods: {
    changeMenu() {
      this.$store.commit("CHANGEMENU");
    },
    headerButton(command){
      if(command === 'logout'){
        //清除cookie中的token
        Cookie.remove('token')
        //清除cookie中的menu
        Cookie.remove('menu')
        this.$router.push('/login')
        window.location.reload()
      }
    }
  },
  computed:{
    ...mapState({
      tags:state=>state.menu.tablist
    })
  }
};
</script>

<style scoped>
.header {
  background-color: rgb(68, 158, 154);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
}
.user {
  margin-right: 15px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.header-left{
  display: flex;
  align-items: center;
}
.breadcrumb{
  margin-left: 10px;
}
</style>