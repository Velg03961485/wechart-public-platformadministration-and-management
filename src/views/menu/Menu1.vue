<template>
	<div class="left-menu1">
		<el-menu :default-active="currentMenu"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse && isShow"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#409EFF">
            <!--微信菜单管理-->
            <router-link :to="{name: 'menuSetting'}">
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">微信公众号管理</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'memberList'}">
              <el-menu-item index="/memberList">
                <i class="el-icon-menu"></i>
                <span slot="title">顾客列表</span>
              </el-menu-item>
            </router-link>
            <el-submenu index="2-1" style="">
              <template slot="title">
                  <i class="el-icon-mobile-phone"></i>
                  <span slot="title">会员等级</span>
              </template>
              <router-link :to="{name: 'memberGard'}">
                <el-menu-item index="/memberGard">会员等级</el-menu-item>
              </router-link>
              <router-link :to="{name: 'memberInterests'}">
                <el-menu-item index="/memberInterests">会员权益设置</el-menu-item>
              </router-link>
            </el-submenu>
            <router-link :to="{name: 'discountList'}">
              <el-menu-item index="/discountList">
                <i class="el-icon-menu"></i>
                <span slot="title">优惠券列表</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'integrationRule'}">
              <el-menu-item index="/integrationRule">
                <i class="el-icon-goods"></i>
                <span slot="title">积分规则</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'orderFormList'}">
              <el-menu-item index="/orderFormList">
                <i class="el-icon-goods"></i>
                <span slot="title">订单列表</span>
              </el-menu-item>
            </router-link>

            <router-link :to="{name: 'tweenTest'}">
              <el-menu-item index="/tweenTest">
                <i class="el-icon-goods"></i>
                <span slot="title">动态效果</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'windows'}">
              <el-menu-item index="/windows">
                <i class="el-icon-goods"></i>
                <span slot="title">滑块验证</span>
              </el-menu-item>
            </router-link>
        </el-menu>
	</div>
</template>
<script>
    export default {
        name:'word-item',
        props:{
            isCollapse: Boolean,
            isShow: Boolean,
        },
        data(){
            return{
                currentMenu:'/'
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
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 160px;
    }
    .el-menu{
        border:0;
    }
</style>
