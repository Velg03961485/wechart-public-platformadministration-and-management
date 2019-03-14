<template>
  <div class="guest-list-page">
    <el-row style="margin-bottom: 2rem">
      <el-col :span="18">
        <el-form ref="form" :model="form" label-width="80px" style="display: flex;flex-direction: column">
          <div class="searchTableStyle">
            <el-form-item label="顾客ID:">
              <el-input type="number" v-model="form.memberId"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话:">
              <el-input type="number" v-model="form.phone"></el-input>
            </el-form-item>
          </div>
          <div class="searchTableStyle">
            <el-form-item label="等级:" style="margin-left: 0rem">
              <el-select v-model="form.grading" placeholder="请选择">
                <el-option
                  v-for="item in memberGrade"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册时间:" style="margin-left: 0rem;">
              <div style="display: flex">
                <div class="block">
                  <el-date-picker
                    :picker-options="pickerOptionsSet"
                    v-model="form.useValue1"
                    type="date"
                    placeholder="选择开始日期">
                  </el-date-picker>
                </div>
                <div class="block" style="margin-left: 0.5rem">
                  <el-date-picker
                    :picker-options="pickerOptionsSet"
                    v-model="form.useValue2"
                    type="date"
                    @change="getUseTimeForOne()"
                    placeholder="选择结束日期">
                  </el-date-picker>
                </div>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button style="float: right;margin-right: 10rem" @click="cheThisSearch">搜索</el-button>
      </el-col>
    </el-row>

    <!--列表-->
    <template style="">
      <el-table
        :data="tableData"
        style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
        <el-table-column
          width="180">
          <template slot-scope="scope">
            <img src="../../assets/image/header.jpg" alt="" style="width: 6rem;height: 6rem;border-radius: 50%">
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="顾客Id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="会员等级">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="checkThisMember()">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script src="@/assets/js/memberList/memberList.js"></script>

<style lang="scss" scoped src="@/assets/css/memberList/memberList.scss"></style>
