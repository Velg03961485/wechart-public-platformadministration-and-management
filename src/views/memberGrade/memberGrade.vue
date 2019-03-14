<template>
  <div class="guest-list-page">
    <!--操作新增-->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" style="float: left;margin-left: 8rem;margin-top: 3rem" @click="addNew()">新增</el-button>
      </el-col>
    </el-row>
    <template style="">
      <el-table
        :data="memberGradeTableData"
        style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
        <el-table-column
          label="会员等级"
          width="180">
          <template slot-scope="scope">
            <span>V{{scope.row.level }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会员名称"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.gradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="积累积分门槛"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.satisfiedMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单笔消费积分满"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.satisfiedPoints }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会员权益" align="center" >
          <template slot-scope="scope" >
            <div class="itemForInterest" style="display: flex;flex-direction: row">
              <img :src="item" v-for="item in scope.row.gradeRights.split(',')" alt="" style="width: 2rem;height: 2rem;float: left">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"></el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.isLast === '1' && scope.row.level !== 0"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="pages" v-if="pageCount > 0" style="margin-top: 2rem;margin-left: 50%">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="perPage" :page-count = 'pageCount'>
      </el-pagination>
    </div>

    <!--会员等级新增/编辑-->
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible" style="" width="63%">
      <!--标签页-->
      <template>
        <el-form :model='formOfText' ref="formOfText" :rules="rules" label-width="160px" class="demo-ruleForm">
          <el-form-item label="会员等级:" prop="laber">
            <el-select v-model="formOfText.laber" placeholder="请选择" :disabled="canChoseLaber">
              <el-option key="0" value="0" disabled="true">V0</el-option>
              <el-option
                v-for="item in laberData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员名称:" prop="name" >
            <el-input v-model="formOfText.name" maxlength="7"  class="listWidth" @input="getNumberInfo(formOfText.name)">
              <i slot="suffix" class="">{{inputNumber}}/7</i>
            </el-input>
          </el-form-item>
          <el-form-item label="等级门槛:">
            <div class="useListForMember">
              <div class="useListForMemberADFirst">
                积分累积满:<el-input type="number" v-model="formOfText.groupFirst" class="listWidthSecond"></el-input>
                <!--——<el-input v-model="formOfText.groupLast" type="number" class="listWidthSecond"></el-input>-->
              </div>
              或
              <div class="useListForMemberAD">
                一次性消费:<el-input type="number" v-model="formOfText.salePoints" class="listWidth"></el-input>积分
              </div>
            </div>
          </el-form-item>
          <el-form-item label="会员权益:" prop="checkedInterest">
            <el-checkbox-group
              v-model="formOfText.checkedInterest"
              style="display: flex;flex-direction: column"
            >
              <el-checkbox style="margin-left: 0;margin-top: 0.2rem" v-for="item in interestData" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="专属折扣:">
            <input type="number" class="inputStyle" v-model="formOfText.discountNumber" onkeyup="value=value.replace(/\.\d{2,}$/,value.substr(value.indexOf('.'),2))">
          </el-form-item>
        </el-form>
      </template>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm('formOfText')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/assets/js/memberGrade/memberGrade.js"></script>

<style scoped>
.itemForInterest{
  /*display: flex;*/
  /*flex-direction: column;*/
  /*border:1px solid red;*/
}
.itemForInterestName{
  font-size: 0.6rem;
}
.listWidth{
  width: 10rem
}
  .listWidthSecond{
    width: 5rem;
  }
  .listWidthThird{
    width: 3.5rem;
  }
  .useListForMember{
    display: flex;
    flex-direction: row;
  }
  .useListForMemberADFirst{
    width: 13rem;
  }
  .useListForMemberAD{
    /*border:1px solid red;*/
    width: 22rem;
    /*margin-top: 0.5rem;*/
    margin-left: 0.5rem;
  }
  .inputStyle{
    width: 12rem;
    height: 2rem;
    /*border-radius: 0.2rem;*/
  }
</style>
