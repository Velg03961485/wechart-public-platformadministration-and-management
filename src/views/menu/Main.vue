<!-- 用户登录后的首页 -->
<template>
    <div class="main-box">
        <div class="header-wrap">
            <div class="company">CRM管理系统</div>
            <!-- <div class="top-menu" style="float:left;">
                <el-menu :default-active="horizontalIndex"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#409EFF">
                    <el-menu-item index="1">我的工作台1</el-menu-item>
                    <el-menu-item index="2">我的工作台2</el-menu-item>
                    <el-menu-item index="3">我的工作台3</el-menu-item>
                    <el-menu-item index="4">我的工作台4</el-menu-item>
                </el-menu>
            </div> -->
            <div class="user">
                <el-dropdown trigger="hover" >
                    <span class="el-dropdown-link" style="color:#fff;">
                      您好，{{userName}}
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" split-button style="text-align:center;">
                        <!--<el-dropdown-item divided>个人中心</el-dropdown-item>-->
                        <!--<el-dropdown-item divided @click.native="notice">通知</el-dropdown-item>-->
                        <el-dropdown-item divided @click.native="logout" >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="left-menu-wrap">
            <el-radio-group v-model="isCollapse">
                <el-radio-button :label="false" v-if="isCollapse">展开</el-radio-button>
                <el-radio-button :label="true" v-if="!isCollapse">收起</el-radio-button>
            </el-radio-group>
            <Menu1 v-if="leftMenu.leftMenu1" :isCollapse="isCollapse" :isShow="leftMenu.leftMenu1"></Menu1>
            <Menu2 v-if="leftMenu.leftMenu2" :isCollapse="isCollapse" :isShow="leftMenu.leftMenu2"></Menu2>
        </div>
        <div class="content-wrap" ref="content" :style="isCollapse ? 'margin-left:70px;' : 'margin-left:160px;'">
            <router-view v-on:listenThis="getMsg"></router-view>
        </div>
    </div>
</template>

<script>
import Menu1 from './Menu1'
import Menu2 from './Menu2'

//引入全局变量
// import global_ from '../../global/Global'
export default {
  name: 'main-box',
  components: {
    Menu1,
    Menu2
  },
  data () {
    return {
        userName:'xxxxx',
        horizontalIndex: '1',
        isCollapse: false,
        // leftMenu: {
        //     leftMenu1:true,
        //     leftMenu2:false,
        //     leftMenu3:false,
        //     leftMenu4:false
        // }
      leftMenu: {
        leftMenu1:true,
        leftMenu2:false,
      }
    }
  },
  created: function(){
    this.$data.userName = localStorage.getItem('username');
    let setLeftMenuShow1 = sessionStorage.getItem('setLeftMenuShow1');
    let setLeftMenuShow2 = sessionStorage.getItem('setLeftMenuShow2');
    // this.leftMenu.leftMenu1 = eval(setLeftMenuShow1.toLowerCase());
    // this.leftMenu.leftMenu2 = eval(setLeftMenuShow2.toLowerCase());

    // console.log(eval(a.toLowerCase()))
    console.log(this.$data.currentMenu)
    //取到浏览器的地址，如果是menu2里面的菜单，把menu1隐藏
    let urlForWindow = window.location.href.split('#')[1].split('/')[1];
    console.log(urlForWindow)
    if(urlForWindow === 'treeMap' || urlForWindow === 'imageTextNews'){
      this.leftMenu.leftMenu1 = false;
      this.leftMenu.leftMenu2 = true;
    }else{
      this.leftMenu.leftMenu1 = true;
      this.leftMenu.leftMenu2 = false;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        var nowKey = "leftMenu"+key;
        for(var i in this.$data.leftMenu){
            var nowI = i;
            this.$data.leftMenu[nowI] = false;
            if(nowKey == nowI){
                this.$data.leftMenu[nowI] = true;
            }
        }

    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    logout() {
        this.$router.replace({name:'Login'})
    //  退登的时候，把存储的uername清空
      localStorage.setItem('username', '');
    },
    //子组件向父组件传递值，控制侧边栏是否显示
    getMsg:function (data) {
      console.log(data);
      if(data == false){
        this.leftMenu.leftMenu1 = false;
        this.leftMenu.leftMenu2 = true;
      }else if(data == true) {
        this.leftMenu.leftMenu1 = true;
        this.leftMenu.leftMenu2 = false;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
    .main-box{
        width: 100%;
        height: 100%;
        color: #333;
        .header-wrap{
            position: fixed;
            top: 0;
            left: 0;
            z-index:99;
            height: 60px;
            width: 100%;
            // min-width: 1204px;
            background: #545c64;
            .company{
                float:left;
                margin-right:30px;
                width:160px;
                line-height:60px;
                font-size:18px;
                text-align:center;
                color:#fff;
            }
            .user{
                position: absolute;
                right:50px;
                line-height:60px;
            }
        }
        .left-menu-wrap{
            position:fixed;
            left:0;
            top:60px;
            z-index:999;
            height: 100%;
            background: #545c64;
            overflow-x:hidden;
            overflow-y:auto;
            // -ms-overflow-style:none;
            // overflow:-moz-scrollbars-none;
            .left-menu{
            }
        }
        .left-menu-wrap::-webkit-scrollbar {
            // display: none;
        }
        .left-menu-wrap::-moz-scrollbar {
            // display: none;
        }

        .content-wrap{
            padding:90px 30px 30px;

        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 160px;

    }
    .el-menu{
        border:0;
    }


</style>
