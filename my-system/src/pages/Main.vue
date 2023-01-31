<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Menu />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <CommonTag />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonTag from "../components/CommonTag.vue";
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
export default {
  name: "Main",
  components: {
    Menu,
    Header,
    CommonTag,
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}
.el-aside {
  overflow: hidden !important;
}
</style>