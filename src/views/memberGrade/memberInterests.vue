<template>
    <div class="guest-list-page">
      <!--操作新增-->
      <el-row>
        <el-col :span="24">
          <el-button type="primary" style="float: left;margin-left: 8rem;margin-top: 3rem" @click="addNew()">新增</el-button>
        </el-col>
      </el-row>
      <!--列表-->
      <template style="">
        <el-table
          :data="memberInterestsTableData"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            label="权益名称"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="图标" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl" alt="" style="width: 2rem;height: 2rem">
            </template>
          </el-table-column>
          <el-table-column
            label="权益内容"
            width="180">
            <template slot-scope="scope">
              {{scope.row.content}}
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


      <!--新增弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="FormVisible" style="">
        <!--标签页-->
        <template>
          <el-form :model='formAddInterset' ref="formAddInterset" :rules="rules" label-width="160px" class="demo-ruleForm">
            <el-form-item label="权益名称:" prop="name" >
              <el-input v-model="formAddInterset.name" maxlength="10" class="listWidth" @input="getNumberInfo(formAddInterset.name)">
                <i slot="suffix" class="">{{inputNumber}}/10</i>
              </el-input>
            </el-form-item>
            <el-form-item label="图标:" prop="image">
              <!--<el-select v-model="formAddInterset.image" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.imageUrl"-->
                  <!--:value="item.imageUrl">-->
                  <!--<img :src="item.imageUrl" alt="" style="width: 1rem;height: 1rem">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <div class="seleImageStyle">
                <div class="imageTopStyle" @click="clickThisChooseIamge">
                  <img :src="formAddInterset.image" alt="" class="getAddImagesStyle">
                  <i class="el-icon-arrow-down rightPoints"></i>
                </div>
                <div class="imageContentStyle" v-if="isShowImgFor === true">
                  <img  v-for="(item,index) in options" :class="getColor == index ? 'backColor':''" class="overyImages" :src="item.imageUrl" alt="" @click="getInfoImageUrl(index,item.imageUrl)">
                </div>
              </div>
            </el-form-item>
            <el-form-item label="权益内容:" prop="content">
              <el-input type="textarea" :rows="2" maxlength="30" v-model="formAddInterset.content" class="listWidth" @input="getContentNumber(formAddInterset.content)">
              </el-input>
              <div>已经输入{{inputNumber2}}/30</div>
            </el-form-item>
          </el-form>
        </template>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="submitForm('formAddInterset')">确 定</el-button>
        </div>
      </el-dialog>

      <!--确认删除弹框-->
      <el-dialog :visible.sync="deleteForm">
        <template>
          <div>删除/编辑该权益后，该权益将从各已设定的会员权益中删除/编辑，是否要删除/编辑</div>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="overCancelDelete()">取 消</el-button>
          <el-button type="primary" @click="sureDelete()">确 定</el-button>
        </div>
      </el-dialog>



    </div>


</template>

<script src="@/assets/js/memberGrade/memberInterests.js"></script>

<style scoped>
  .listWidth{
    width: 13rem
  }
  .seleImageStyle{
    width: 13rem;
    height: 12rem;
    /*border:1px solid red;*/
    margin-left: 0rem;
  }
  .imageTopStyle{
    width: 100%;
    height: 2rem;
    border:1px solid #bababa;
    line-height: 2rem;
  }
  .overyImages{
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
  }
  .getAddImagesStyle{
    height: 1rem;
    width: 1rem;
    margin-left: 0.5rem;
    margin-top: 0.4rem;
  }
  .rightPoints{
    float: right;
    margin-top: 0.2rem;
    margin-right: 1rem;
    font-size: 1.6rem;
  }
  .imageContentStyle{
    width: 100%;
    height: 10rem;
    border:1px solid #e0e6ed;
    display: flex;
  }
  .backColor{
    /*background-color: red;*/
    border:1px solid red;
  }
</style>
