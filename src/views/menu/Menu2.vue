<template>
  <div class="left-menu1">
    <el-menu :default-active="currentMenu"
             class="el-menu-vertical-demo"
             :collapse="isCollapse && isShow"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#409EFF">

          <!--微信隐藏菜单二-->
          <router-link :to="{name: 'treeMap'}">
            <el-menu-item index="/treeMap">
              <!--<i class="el-icon-menu"></i>-->
              <span slot="title">菜单设置</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{name: 'imageTextNews'}">
            <el-menu-item index="/imageTextNews">
              <!--<i class="el-icon-menu"></i>-->
              <span slot="title">图文管理</span>
            </el-menu-item>
          </router-link>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "menu2",
      props:{
        isCollapse: Boolean,
        isShow: Boolean,
      },
      data(){
        return{
          currentMenu:'/'      //默认地址，应该有修改
        }
      },
      created(){
        this.getUrl();
      },
      methods:{
        getUrl(){
          let self = this;
          let currentUrl = window.location.href;
          self.currentMenu = currentUrl.split('#')[1];
        }
      }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 160px;
  }
  .el-menu{
    border:0;
  }
</style>
