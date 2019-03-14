<template>
  <div class="guest-list-page">
    <!--第一次进去的首页-->
      <div v-if="isShowFirst === 1">
        <div class="noContentStyle">目前你还没有设置过积分规则，现在去设置一下吧？</div>
        <div class="btnBorderStyle">
          <el-button type="primary" class="firstAddBtnStyle" @click="addNew">新增一条积分规则</el-button>
        </div>
      </div>
    <el-row v-if="isShowFirst === 2">
      <el-col :span="24">
        <el-button type="primary" style="float: left;margin-left: 8rem;margin-top: 3rem" @click="addNew()">新增</el-button>
      </el-col>
    </el-row>
    <!--列表页-->
    <template style="" v-if="isShowFirst === 2">
      <el-table
        :data="integrationTableData"
        style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem" >
        <el-table-column
          label="类型"
          width="80">
          <template slot-scope="scope">
            <span v-show="scope.row.type === '0'">比例性</span>
            <span v-show="scope.row.type === '1'">固定值型</span>
            <span v-show="scope.row.type === '2'">倍数型</span>
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
        >
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属门店"
        >
          <template slot-scope="scope">
            <!--<div v-for="item in scope.row.nameStore">-->
              <!--<span >{{item.name}}</span>-->
            <!--</div>-->
            <span>{{scope.row.shopsName | fontLength(10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
        >
        </el-table-column>
        <el-table-column
          prop="pointRule"
          label="积分规则"
        >
          <template slot-scope="scope">
            <span v-show="scope.row.type === '0'">{{scope.row.percentMoneny}}:{{scope.row.percentMoneny}}</span>
            <span v-show="scope.row.type === '1'">{{scope.row.integralNum}}</span>
            <span v-show="scope.row.type === '2'">{{scope.row.integralDouble}}倍</span>
          </template>
        </el-table-column>
        <el-table-column
          label="规则生效期"
          width="200">
          <template slot-scope="scope">
            <div v-show="scope.row.type === '0' || scope.row.type === '2'">
              <div>开始:{{scope.row.effectStart}}</div>
              <div>结束:{{scope.row.effectEnd}}</div>
            </div>
            <div v-show="scope.row.type === '1'">--</div>
          </template>
        </el-table-column>
        <el-table-column
          label="积分有效期"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.invalidDays | timeType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <span v-show="scope.row.status === '0'">未启用</span>
            <span v-show="scope.row.status === '1'">已启用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope" style="display: flex">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="primary"
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

    <!--选择不同状态-->
    <el-dialog title="新建积分规则" :visible.sync="integrationForm" style="" width="63%">
      <template>
        <div class="getClickStyle">
          <div v-for="item in integraType" class="itemBtnStyle" @click="choseTypeForInte(item.id)">
            <a style="text-decoration: none;color: black">{{item.name}}</a>
          </div>
        </div>
      </template>
    </el-dialog>
    <!--新增-->
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible" style="" width="63%">
      <!--标签页-->
      <template>
        <el-form :model='formOfInter' ref="formOfInter" :rules="rules" label-width="160px" class="demo-ruleForm">
          <el-form-item label="名称:" prop="name" v-if="formOfInter.type === '1' || formOfInter.type === '2'">
            <el-select v-model="formOfInter.name" placeholder="请选择">
              <el-option
                v-for="item in laberData"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称:" prop="name" v-if="formOfInter.type === '0'">
            <el-input v-model="formOfInter.name" maxlength="15"  class="listWidth" @input="getNumberInfo(formOfInter.name)">
              <i slot="suffix" class="">{{inputNumber}}/15</i>
            </el-input>
          </el-form-item>

          <el-form-item label="适用品类:" v-if="formOfInter.type === '2' || formOfInter.type === '0'">
            <div v-if="formOfInter.type === '0' || formOfInter.type === '2'">材质:</div>
            <div style="display: flex" v-if="formOfInter.type === '0' || formOfInter.type === '2'">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 0rem">
                全部
              </el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in textureData" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="formOfInter.type === '2'">款式:</div>
            <div style="display: flex" v-if="formOfInter.type === '2'">
              <el-checkbox :indeterminate="isStyleterminate" v-model="checkAllStyle" @change="handleCheckAllStyleChange" style="margin-left: 0rem">
                全部
              </el-checkbox>
              <!--<div style="margin: 15px 0;"></div>-->
              <el-checkbox-group v-model="checkedStyleList" @change="handleCheckedStyleChange">
                <el-checkbox v-for="item in styleListData" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>

          </el-form-item>
          <el-form-item label="积分生成比例:" v-if="formOfInter.type === '0'" prop="proportionSecond">
            <input type="number" class="inputStyle" v-model="formOfInter.proportionFirst" onkeyup="value=value.replace(/\.\d{2,}$/,value.substr(value.indexOf('.'),2))">:
            <input type="number" class="inputStyle" v-model="formOfInter.proportionSecond" onkeyup="value=value.replace(/\.\d{2,}$/,value.substr(value.indexOf('.'),2))">
            <div>消费金额:积分</div>
          </el-form-item>
          <el-form-item label="积分数:" v-if="formOfInter.type === '1'" prop="pointNumber">
            <el-input type="number" v-model="formOfInter.pointNumber" maxlength="10"  class="pointWidth"></el-input>分
          </el-form-item>
          <el-form-item label="消费积分翻倍数:" v-if="formOfInter.type === '2'" prop="multipleNumber">
            <el-input type="number" v-model="formOfInter.multipleNumber" maxlength="10"  class="pointWidthLast" placeholder="请输入倍数"></el-input>
          </el-form-item>
          <el-form-item label="使用门店:">
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
          <el-form-item label="内容:" prop="content">
            <el-input type="textarea" v-model="formOfInter.content" maxlength="30"  class="TextInputWidth" @input="getContentNumber(formOfInter.content)"></el-input>
            <div>已经输入{{inputNumber2}}/30</div>
          </el-form-item>
          <el-form-item label="规则生效期:" v-if="formOfInter.type === '0' || formOfInter.type === '2'" prop="useValue2">
            <div style="display: flex" class="timeStyleFor">
              <div class="block" style="margin-left: 0rem">
                <el-date-picker
                  :picker-options="pickerOptionsSet"
                  v-model="formOfInter.useValue1"
                  type="date"
                  placeholder="选择开始日期">
                </el-date-picker>
              </div>
              <div style="margin-left: 0rem">~</div>
              <div class="block" style="margin-left: 0rem">
                <el-date-picker
                  :picker-options="pickerOptionsSet"
                  v-model="formOfInter.useValue2"
                  type="date"
                  @change="getUseTimeForOne()"
                  placeholder="选择结束日期">
                </el-date-picker>
              </div>
            </div>

          </el-form-item>
          <el-form-item label="积分有效期:" prop="timeType">
            <el-select v-model="formOfInter.timeType" placeholder="请选择">
              <!--<el-option v-for="item in laberData"-->
                         <!--:key="item.name"-->
                         <!--:label="item.name"-->
                         <!--:value="item.name"></el-option>-->
              <el-option key="0" label="180天" value="0"></el-option>
              <el-option key="1" label="365天" value="1"></el-option>
              <el-option key="2" label="730天" value="2"></el-option>
              <el-option key="3" label="1096天" value="3"></el-option>
              <el-option key="4" label="永久有效" value="4"></el-option>
              <el-option key="5" label="次年清零" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="submitForm('formOfInter')" style="margin-right: 10rem">确 定</el-button>
        <el-button @click="cancel()" style="margin-left: 10rem">取 消</el-button>
      </div>
    </el-dialog>

    <!--删除-->
    <el-dialog title="确认删除积分规则" :visible.sync="deleteIntegration" style="" width="63%">
      <template>
        <div style="text-align: center;">
          <span style="text-align: center;margin: 0 auto">该积分规则正处于有效期，是否删除？</span>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="sureDeleteThis()" style="margin-right: 10rem">确 定</el-button>
        <el-button @click="cancelNoDelete()" style="margin-left: 10rem">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/assets/js/integrationRule/integrationRule.js"></script>

<style lang="scss" scoped src="@/assets/css/integrationRule/integrationRule.scss"></style>
