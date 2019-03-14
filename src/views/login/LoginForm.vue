<template>
    <div class="login-form">

      <el-card>
        <div class="company">CRM管理系统</div>
        <div class="title"></div>
        <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="0px">
            <el-form-item prop="username">
              <el-input type="text" v-model="loginInfo.username" auto-complete="off" placeholder="帐号" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginInfo.password" auto-complete="off" @keyup.enter.native="login" placeholder="密码" />
            </el-form-item>
            <div class="login-btn-box">
              <!--<el-button @click="reset" class="login-btn">重置</el-button>-->
              <el-button type="primary" @click="login" class="login-btn">登录</el-button>
            </div>
        </el-form>
      </el-card>

    </div>
</template>

<script src="@/assets/js/login/LoginForm.js"></script>

<style lang="scss" scoped src="@/assets/css/login/LoginForm.scss"></style>
