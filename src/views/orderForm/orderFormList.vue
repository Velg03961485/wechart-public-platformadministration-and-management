<template>
    <div class="guest-list-page">
      <!--操作-->
      <el-row>
        <el-col :span="24">
          <el-button type="primary" style="float: left;margin-left: 8rem;margin-top: 3rem;width: 8rem" @click="checkMemberInfo()">会员查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" style="float: left;margin-left: 8rem;margin-top: 1rem;width: 8rem" @click="addNew()">新增</el-button>
        </el-col>

      </el-row>
      <!--搜索-->
      <el-row style="margin-bottom: 2rem;margin-top: 1rem">
        <el-col :span="24" style="">
          <el-form ref="cheFormOrder" :model="cheFormOrder" label-width="80px" style="">
            <div class="searchTableStyle">
              <el-form-item label="消费时间:" style="">
                <div style="display: flex">
                  <div class="block">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="cheFormOrder.useValue1"
                      type="date"
                      placeholder="选择开始日期">
                    </el-date-picker>
                  </div>
                  <div class="block" style="margin-left: 0.5rem">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="cheFormOrder.useValue2"
                      type="date"
                      @change="getUseTimeForOne()"
                      placeholder="选择结束日期">
                    </el-date-picker>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="录单时间:" style="margin-left: 0rem;">
                <div style="display: flex">
                  <div class="block">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="cheFormOrder.orderValue1"
                      type="date"
                      placeholder="选择开始日期">
                    </el-date-picker>
                  </div>
                  <div class="block" style="margin-left: 0.5rem">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="cheFormOrder.orderValue2"
                      type="date"
                      @change="getUseTimeForOne()"
                      placeholder="选择结束日期">
                    </el-date-picker>
                  </div>
                </div>
              </el-form-item>
              <el-button style="float: right;margin-right: 2rem;margin-left: 4rem;width: 6rem;height: 2.5rem" @click="cheThisSearch">搜索</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <!--数据列表-->
      <template style="">
        <el-table
          :data="tableDataOrderList"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            prop="num"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="顾客"
            width="180">
          </el-table-column>
          <el-table-column
            prop="style"
            label="材质/款式">
          </el-table-column>
          <el-table-column
            prop="number"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额（元）">
          </el-table-column>
          <el-table-column
            prop="consumerTime"
            label="消费日期">
          </el-table-column>
          <el-table-column
            prop="orderTime"
            label="录单日期">
          </el-table-column>
          <el-table-column
            label="操作" width="180">
            <template slot-scope="scope">
              <el-button  type="primary" size="small" @click="checkThisOrder()">查看</el-button>
              <el-button  type="primary" size="small" @click="deleteThisOrder()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!--会员查询-->
      <el-dialog :visible.sync="CheckInfoFormVisible" style="" width="80rem">
        <template>
          <div class="infoBorderStyle" v-show="isInfoForMember">
            <div class="infoTitleStyle">会员信息</div>
            <!--查询-->
            <div class="infoCheckBorderStyle">
              <div class="cheBorderForInfoStyle">
                <div class="cheTit">手机号:</div>
                <el-input v-model="input" placeholder="请输入用户的手机号" style="width: 20rem" class="chePhoneStyle"></el-input>
                <!--<el-button icon="el-icon-search" ></el-button>-->
                <!--<div class=""></div>-->
                <i class="el-icon-search cheIoStyle"></i>
              </div>
              <el-button type="primary" style="" @click="addNew()" class="cheAddStyle">新增</el-button>
            </div>
            <!--会员信息-->
            <div class="infoMemberBorderStyle">
              <!--头像-->
              <div class="memberHeadStyle">
                <img src="../../assets/image/header.jpg" alt="" class="memberImage">
              </div>
              <!--用户信息-->
              <div class="memberInfoStyle">
                <div class="memberInfoFirst">
                  <div class="memberInfoName">
                    <div class="memberInfoForName">姓名:</div>
                    <div class="memberInfoForRole">李明</div>
                  </div>
                  <div class="memberInfoName magRig">
                    <div class="memberInfoForName">电话:</div>
                    <div class="memberInfoForRole">15655656783</div>
                  </div>
                </div>
                <div class="memberInfoFirst">
                  <div class="memberInfoName">
                    <div class="memberInfoForName">会员等级:</div>
                    <div class="memberInfoForRole">黄金会员</div>
                  </div>
                  <div class="memberInfoName magRig">
                    <div class="memberInfoForName">积分:</div>
                    <div class="memberInfoForRole" @click="cheThisPoint"><a style="text-decoration: none;color: black" class="cheThisPointStyle">10000</a></div>
                  </div>
                </div>
                <div class="memberInfoFirst">
                  <div class="memberInfoName">
                    <div class="memberInfoForName">专属导购:</div>
                    <div class="memberInfoForRole">小童</div>
                  </div>
                  <div class="memberInfoName magRig">
                    (800积分将在一个月内失效)
                  </div>
                </div>
              </div>
            </div>
            <!--优惠券-->
            <div></div>
          </div>
          <div class="infoBorderStyle" v-show="isInfoForPoint">
            <div class="infoTitleStyle">会员信息</div>
            <div class="titForPointStyle">会员信息/积分详情</div>
            <div><a class="backTitForPointStyle" @click="backMemberInfo">< &nbsp;&nbsp;返回</a></div>
            <el-table
              :data="pointDetailChange"
              style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
              <el-table-column
                prop="time"
                label="时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                width="180">
              </el-table-column>
              <el-table-column
                prop="takeNum"
                label="分值">
              </el-table-column>
              <el-table-column
                prop="lastNum"
                label="结余">
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-dialog>
    </div>
</template>

<script src="@/assets/js/orderForm/orderFormList.js"></script>

<style lang="scss" scoped src="@/assets/css/orderForm/orderFormList.scss"></style>
