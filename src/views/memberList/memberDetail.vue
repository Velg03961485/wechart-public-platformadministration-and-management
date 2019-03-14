<template>
    <div class="guest-list-page">
      <el-row>
        <el-col :span="24">
          <div class="memberNameTitle">会员列表 > 李明</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="backTo">
            <a style="text-decoration: none;color: black" @click="backMemberList()">< 返回</a>
          </div>
        </el-col>
      </el-row>
      <!--会员详细情况-->
      <el-row>
        <el-col :span="18">
          <div class="memberContentStyle">
            <!--头像-->
            <div class="memberHeadStyle">
              <img src="../../assets/image/header.jpg" alt="" class="memberImage">
              <div class="headTitle">人脸</div>
            </div>
            <!--用户信息-->
            <div class="memberInfoStyle">
              <div class="memberInfoFirst">
                <div class="memberInfoName">
                  <div class="memberInfoForName">姓名:</div>
                  <div class="memberInfoForRole">李明</div>
                </div>
                <div class="memberInfoName">
                  <div class="memberInfoForName">会员等级:</div>
                  <div class="memberInfoForRole">黄金会员</div>
                </div>
              </div>
              <div class="memberInfoFirst">
                <div class="memberInfoName">
                  <div class="memberInfoForName">电话:</div>
                  <div class="memberInfoForRole">15655656783</div>
                </div>
                <div class="memberInfoName">
                  <div class="memberInfoForName">积分:</div>
                  <div class="memberInfoForRole">10000</div>
                </div>
              </div>
              <div class="memberInfoLast">
                专属导购:小童
              </div>
            </div>
            <!--用户标签-->
            <div class="memberTakeStyle">
              <div class="memberTakeContent">
                <span>黄金</span>
                <span>戒指</span>
                <span>中国风</span>
              </div>
              <div class="memberTakeBottom">用户标签</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--分布信息-->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 2rem">
          <el-tab-pane label="人物画像" name="first">
            <figure-image></figure-image>
          </el-tab-pane>
          <el-tab-pane label="消费记录" name="second">
            <expense-record></expense-record>
          </el-tab-pane>
          <el-tab-pane label="积分记录" name="third">
            <inter-gral-record></inter-gral-record>
          </el-tab-pane>
          <el-tab-pane label="优惠券" name="fourth">
            <discount-coupon></discount-coupon>
          </el-tab-pane>
          <el-tab-pane label="维修记录" name="fifth">
            <maintenance-record></maintenance-record>
          </el-tab-pane>
          <el-tab-pane label="到店记录" name="sixth">
            <shopping-guide></shopping-guide>
          </el-tab-pane>
        </el-tabs>
      </template>

    </div>
</template>

<script src="@/assets/js/memberList/memberDetail.js"></script>

<style lang="scss" scoped src="@/assets/css/memberList/memberDetail.scss"></style>
