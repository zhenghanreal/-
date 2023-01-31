<template>
  <div class="tabs">
    <el-tag
      @close="removeTag(item, index)"
      @click="changeTag(item)"
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  computed: {
    ...mapState({
      tags: (state) => state.menu.tablist,
    }),
  },
  methods: {
    ...mapMutations(["REMOVETAG"]),
    changeTag(item) {
      this.$router.push(item.path);
    },
    removeTag(item, index) {
      this.REMOVETAG(item);
      const length = this.tags.length;
      if(item.path !== this.$route.path){
          return
      }
      if( index === length ){
          this.$router.push(this.tags[index-1].name)
      }else{
          this.$router.push(this.tags[index].name)
      }
    },
  },
};
</script>

<style scoped>
.tabs{
    margin: 10px 10px 0px 10px;
}
.el-tag{
    margin-left: 10px;
}
</style>