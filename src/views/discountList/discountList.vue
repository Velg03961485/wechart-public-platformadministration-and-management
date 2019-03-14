<template>
  <div class="guest-list-page">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" style="float: left;margin-left: 8rem;margin-top: 3rem" @click="addNew()">新增</el-button>
      </el-col>
    </el-row>
    <!--列表-->
    <template style="">
      <el-table
        :data="discountTableData"
        style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
        <el-table-column
          label="券种"
          width="180">
          <template slot-scope="scope">
            <span v-show="scope.row.category === '0'">用户券</span>
            <span v-show="scope.row.category === '1'">员工券</span>
          </template>
        </el-table-column>
        <el-table-column
          label="优惠类型"
          width="180">
          <template slot-scope="scope">
            <span v-show="scope.row.type === '0'">代金券</span>
            <span v-show="scope.row.type === '1'">折扣券</span>
            <span v-show="scope.row.type === '2'">满减券</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          label="有效期"
          width="180">
          <template slot-scope="scope">
            <span v-show="scope.row.indateType === '0'">{{scope.row.useStart}}--{{scope.row.useEnd}}</span>
            <span v-show="scope.row.indateType === '1'">{{scope.row.invalidDays}}天失效</span>
          </template>
        </el-table-column>
        <el-table-column
          label="领取数/使用数"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.receiveNum}}/{{scope.row.usedNum}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkOutThisDetail(scope.row)">详情</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <div class="pages" v-if="pageCount > 0" style="margin-top: 2rem;margin-left: 50%">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="perPage" :page-count = 'pageCount'>
      </el-pagination>
    </div>
    <!--选择券的种类-->
    <el-dialog title="选择优惠券类型" :visible.sync="chooseCardForm">
      <template>
        <div class="choseForBtnSytle">
          <div class="btnBorStyle">
            <div class="choseForBtnSytleBor"><a class="choseForBtnSytleOne" :class="changeColorOne" @click="chooseCardOne">顾客券</a></div>
            <div class="choseForBtnSytleBor"><a class="choseForBtnSytleOne" :class="changeColorTwo" @click="chooseCardTwo">员工券</a></div>
          </div>
        </div>
        <div class="getClickStyle">
          <div v-for="item in cardsType" class="itemBtnStyle" @click="choseTypeForInte(item.id)">
            <a style="text-decoration: none;color: black">{{item.name}}</a>
          </div>
        </div>
      </template>
    </el-dialog>
    <!--新建-->
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible"  width="66%">
      <!--标签页-->
      <template>
        <el-form :model='formAddDiscount' ref="formAddDiscount" :rules="rules" label-width="200px" class="demo-ruleForm">
          <el-form-item label="优惠券金额:" :prop="fillMoneyType">
            <div v-if="chooseCardTypeFor === '0'">
              <el-input type="number" v-model="formAddDiscount.fullFirst" class="listWidthTow"></el-input>元，
              满<el-input type="number" v-model="formAddDiscount.fullSecond" class="listWidthTow" @blur.prevent="getThisInfoFull(formAddDiscount.fullSecond)"></el-input>元可用
            </div>
            <div v-if="chooseCardTypeFor === '1'">
              折扣
              <input type="number" class="inputStyle" placeholder="1-9.9折" v-model="formAddDiscount.discountFirst" onkeyup="value=value.replace(/\.\d{2,}$/,value.substr(value.indexOf('.'),2))" @blur.prevent="getThisInfoDiscount(formAddDiscount.discountFirst)">
              折，
              <el-input type="number" v-model="formAddDiscount.discountSecond" class="listWidthTow"></el-input>封顶
            </div>
            <div v-if="chooseCardTypeFor === '2'">
              每满<el-input type="number" v-model="formAddDiscount.AllFullFirst" class="listWidthTow"></el-input>减
              <el-input type="number" v-model="formAddDiscount.AllFullSecond" class="listWidthTow" @blur.prevent="getThisInfoAllFull(formAddDiscount.AllFullSecond)"></el-input>，
              <el-input type="number" v-model="formAddDiscount.AllFullThird" @blur.prevent="getThisInfoAllFullThree(formAddDiscount.AllFullThird)" class="listWidthTow"></el-input>封顶
            </div>
          </el-form-item>
          <el-form-item label="主题:" prop="name">
            <el-input v-model="formAddDiscount.name" class="listWidth"></el-input>
          </el-form-item>
          <el-form-item label="副标题:" prop="subintName">
            <el-input v-model="formAddDiscount.subintName" class="listWidth"></el-input>
          </el-form-item>
          <el-form-item label="有效期:" :prop="fillTimerType">
            <div class="chooseTimeOneStyle">
              <el-checkbox v-model="formAddDiscount.checkedTimeOne" @change="chooseTimeTypeCheck"></el-checkbox>
              <div class="choseTimeForStyle">
                <div class="shoseTimeListType">
                  发放时间:
                  <div class="block">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="formAddDiscount.useValue1"
                      type="date"
                      :disabled="canUseTakeTime"
                      placeholder="选择开始日期">
                    </el-date-picker>
                  </div>
                  <div class="block" style="margin-left: 0.5rem">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="formAddDiscount.useValue2"
                      type="date"
                      :disabled="canUseTakeTime"
                      @change="getUseTimeForOne()"
                      placeholder="选择结束日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="shoseTimeListType">
                  使用时间:
                  <div class="block">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="formAddDiscount.takeValue1"
                      type="date"
                      :disabled="canUseTakeTime"
                      @change="getTakeTimeForOneLast()"
                      placeholder="选择开始日期">
                    </el-date-picker>
                  </div>
                  <div class="block" style="margin-left: 0.5rem">
                    <el-date-picker
                      :picker-options="pickerOptionsSet"
                      v-model="formAddDiscount.takeValue2"
                      type="date"
                      :disabled="canUseTakeTime"
                      @change="getTakeTimeForTwo()"
                      placeholder="选择结束日期">
                    </el-date-picker>
                  </div>
                </div>

              </div>
            </div>
            <div class="chooseTimeOneStyle">
              <el-checkbox v-model="formAddDiscount.checkedTimeTwo" @change="chooseTimeTypeSelect" style="margin-left: 0.5rem"></el-checkbox>
              <div class="choseTimeAndSelStyle">
                领取后
                <el-input type="number" :disabled="canUseFormTime" v-model="formAddDiscount.useForTime" style="width: 9rem"></el-input>
                天失效
              </div>
            </div>
          </el-form-item>
          <el-form-item label="适用品类:">
            <div>材质:</div>
            <div style="display: flex">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 0rem">
                全部
              </el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in textureData" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div>款式:</div>
            <div style="display: flex">
              <el-checkbox :indeterminate="isStyleterminate" v-model="checkAllStyle" @change="handleCheckAllStyleChange" style="margin-left: 0rem">
                全部
              </el-checkbox>
              <!--<div style="margin: 15px 0;"></div>-->
              <el-checkbox-group v-model="checkedStyleList" @change="handleCheckedStyleChange">
              <el-checkbox v-for="item in styleListData" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>

          </el-form-item>
          <el-form-item label="使用门店:" v-if="isTypeCardFor === '0'">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expand-all="false"
              :expand-on-click-node="false"
              ref="tree"
              highlight-current
              :default-checked-keys="checkedIds"
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="发放对象:" prop="usePeopleRadio" v-if="isTypeCardFor === '0'">
            <el-radio-group v-model="formAddDiscount.usePeopleRadio" style="display: flex;flex-direction: column">
              <el-radio :label="0" style="margin-left: 0rem;margin-top: 1rem">所有人</el-radio>
              <el-radio :label="1" style="margin-left: 0rem;margin-top: 1rem">微信注册新用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发放总数:" prop="pushAllNumber">
            <el-input type="number" v-model="formAddDiscount.pushAllNumber" class="listWidth"></el-input>
          </el-form-item>
          <el-form-item label="每人限领取:" prop="overyOneGetNumber">
            <el-input type="number" v-model="formAddDiscount.overyOneGetNumber" class="listWidth"></el-input>张
          </el-form-item>
          <el-form-item label="其他限制:" prop="checkListUseType">
            <el-checkbox-group v-model="formAddDiscount.checkListUseType" @change="handelThisUseType">
              <el-checkbox :label="1" :value="1" :key="1">不可叠加其他优惠券</el-checkbox>
              <el-checkbox :label="2" :value="2" :key="2">不可和店铺其他活动同时使用</el-checkbox>
              <el-checkbox :label="3" :value="3" :key="3" style="margin-left: 1rem">不可和会员卡同时使用</el-checkbox>
              <el-checkbox :label="4" :value="4" :key="4" style="margin-left: 0rem">不可和积分抵现同时使用</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动营销图">
            <el-upload
              class="avatar-uploader"
              :action="importFileUrl()"
              :show-file-list="false"
              :data="upLoadData"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px solid forestgreen"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠券描述:" prop="content">
            <el-input type="textarea" :rows="2" v-model="formAddDiscount.content" class="listWidth"></el-input>
          </el-form-item>
          <el-form-item label="公司名称:" prop="companyName">
            <el-input v-model="formAddDiscount.companyName" class="listWidth"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="companyPhone">
            <el-input type="number" maxlength="11" v-model="formAddDiscount.companyPhone" class="listWidth"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('formAddDiscount')" style="margin-right: 10rem">确 定</el-button>
        <el-button @click="cancel()" style="margin-left: 10rem">取 消</el-button>

      </div>
    </el-dialog>
    <!--删除-->
    <el-dialog title="确认删除积分规则" :visible.sync="deleteCard" style="" width="63%">
      <template>
        <div style="text-align: center;">
          <span style="text-align: center;margin: 0 auto">确认要删除此张卡券？</span>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="sureDeleteThis()" style="margin-right: 10rem">确 定</el-button>
        <el-button @click="cancelNoDelete()" style="margin-left: 10rem">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src="@/assets/js/discountList/discountList.js"></script>

<style lang="scss" scoped src="@/assets/css/discountList/discountList.scss"></style>
