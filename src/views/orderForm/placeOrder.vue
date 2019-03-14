<template>
  <div class="guest-list-page">
    <!--消费日期-->
    <el-row>
      <el-col :span="12" class="place_inputBorderStyle">
        <div class="place_inputTitStyle">消费日期:</div>
        <div class="place_inputRightBorderStyle">
          <el-date-picker
            :picker-options="pickerOptionsSet"
            v-model="consumption.useValue1"
            type="date"
            placeholder="选择开始日期">
          </el-date-picker>
        </div>

      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <!--手机号、姓名-->
    <div class="memberInfoStyleForPlace">
      <el-row class="border_placeInputStyle">
        <el-col :span="12" class="place_inputBorderStyle">
          <div class="place_inputTitStyle">手机号:</div>
          <div class="place_inputRightBorderStyle">
            <el-input v-model="input" placeholder="请输入内容" class="place_inputStyle"></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="place_inputBorderStyle">
          <div class="place_inputTitStyle">姓名:</div>
          <div class="place_inputRightBorderStyle">
            <el-input v-model="input" placeholder="请输入内容" class="place_inputStyle"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="border_placeInputStyle">
        <el-col :span="12" class="place_inputBorderStyle">
          <div class="place_inputTitStyle">积分:</div>
          <div class="place_inputRightBorderStyle">
            <el-input v-model="input" placeholder="20000" class="place_inputStyle"></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="place_inputBorderStyle">
          <div class="place_inputTitStyle">专属导购:</div>
          <div class="place_inputRightBorderStyle">
            <el-select v-model="value" placeholder="请选择" class="place_inputStyle">
              <el-option
                v-for="item in shoppingGuideData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--消费的商品添加-->
    <div class="add_goodsListBorderStyle">
      <div class="add_goodsListTitleStyle">已添加的商品:</div>
      <div class="add_goodsListUlStyle">
        <div class="add_goodsItemStyle">
          <div class="add_goodsItemNameStyle">商品1</div>
          <div class="add_goodsItemTextStyle">
            <span>材质:</span>
            <span class="itemMarginLift">黄金</span>
          </div>
          <div class="add_goodsItemStyleStyle">
            <span>款式:</span>
            <span class="itemMarginLift">戒指</span>
          </div>
          <div class="add_goodsItemMoneyStyle">
            <span>金额:</span>
            <span class="itemMarginLift">7500.00元</span>
          </div>
          <div class="add_goodsItemTakeStyle">
            <el-button plain size="mini">修改</el-button>
            <el-button plain size="mini">删除</el-button>
          </div>
        </div>
        <div class="add_goodsItemStyle">
          <div class="add_goodsItemNameStyle">商品1</div>
          <div class="add_goodsItemTextStyle">
            <span>材质:</span>
            <span class="itemMarginLift">黄金</span>
          </div>
          <div class="add_goodsItemStyleStyle">
            <span>款式:</span>
            <span class="itemMarginLift">戒指</span>
          </div>
          <div class="add_goodsItemMoneyStyle">
            <span>金额:</span>
            <span class="itemMarginLift">7500.00元</span>
          </div>
          <div class="add_goodsItemTakeStyle">
            <el-button plain size="mini">修改</el-button>
            <el-button plain size="mini">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--添加商品-->
    <div class="add_btnStyle">
      <el-button type="primary" class="addBtn_textBtnStyle">+添加商品</el-button>
    </div>

    <!--添加优惠券-->
    <div class="add_cardBorderStyle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已核销优惠券" name="first">
          <!--已核销-->
          <div class="item_cardBorderStyle">
            <div class="item_cardForOneStyle" v-for="item in cardListData" @click="choseThisCard(item)">
              <!--优惠券内容-->
              <div class="item_cardContentStyle" >
                <div class="item_cardContentImageStyle">
                  <img src="../../assets/image/header.jpg" alt="" class="item_cardContentImg">
                </div>
                <div class="item_cardContentNameStyle">
                  {{item.name}}
                </div>
                <div class="item_cardContentSubNameStyle">
                  {{item.subName}}
                </div>
                <div class="item_cardContentTypeStyle">
                  {{item.type}}
                </div>
                <div class="item_cardContentTimeStyle">
                  {{item.time}}
                </div>
              </div>
              <!--选取后的样式-->
              <div class="choseThisItem_cardStyle" v-if="number === item.id">

              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未核销优惠券" name="second">
          <!--未核销-->

        </el-tab-pane>
      </el-tabs>
    </div>

    <!--积分抵扣-->
    <div></div>

  </div>
</template>

<script src="@/assets/js/orderForm/placeOrder.js"></script>

<style lang="scss" scoped src="@/assets/css/orderForm/placeOrder.scss"></style>
