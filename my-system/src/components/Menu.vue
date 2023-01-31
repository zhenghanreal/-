<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse?'后台':'后台管理系统' }}</h3>
      <el-menu-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :key="item.name"
        :index="item.name"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in hasChildren"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.label"
        >
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.label">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  border-right: none !important;
}
.el-menu h3 {
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 400px;
}
</style>
<script>
import Cookie from 'js-cookie'
import menu from '@/store/menu';
export default {
  name: "Menu",
  data() {
    return {};
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.menu.isCollapse
    },
    menuData(){
      return JSON.parse(Cookie.get('menu')) || this.$store.state.menu.menu
    }
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    clickMenu(item){
      if(this.$route.path !== item.path && !(this.$route.path ==='/home' && item.path ==='/')){
        this.$router.push(item.path)
      }
      this.$store.commit('SELECTMENU',item)
    }
  },
};
</script>

<style scode>
</style>