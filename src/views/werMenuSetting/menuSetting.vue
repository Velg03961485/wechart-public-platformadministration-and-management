<template>
  <div class="guest-list-page">
    <!--点击新建-->
    <el-row>
      <el-col>
        <button class="btn" @click="add()">新建</button>
      </el-col>
    </el-row>
    <!--展现微信公众号列表-->
    <el-table
      :data="tableData"
      style="width: 100%;text-align:center;margin-left: 0rem">
      <el-table-column
        prop="id"
        label="编号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="公总号名称"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">进入</el-button>
          <el-button type="text" size="small" @click="checkOut(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deletThisWX(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pages" v-if="pageCount > 0" style="margin-top: 2rem;margin-left: 50%">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="perPage" :page-count = 'pageCount'>
      </el-pagination>
    </div>

    <!--新增模板-->
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible">
      <el-form :model='formName' ref="formName" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="公众号名称" prop="name">
          <el-input v-model="formName.name" class="listWidth"></el-input>
        </el-form-item>
        <el-form-item label="公众号原始ID" prop="originalId" >
          <el-input v-model="formName.originalId" class="listWidth"></el-input>
        </el-form-item>
        <el-form-item label="APP ID" prop="appId">
          <el-input v-model="formName.appId" class="listWidth"></el-input>
        </el-form-item>
        <el-form-item label="appSecret" prop="appSecret">
          <el-input v-model="formName.appSecret" class="listWidth"></el-input>
        </el-form-item>
        <el-form-item label="使用门店">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel(formName)">取 消</el-button>
        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/assets/js/werMenuSetting/menuSetting.js"></script>

<style  lang="scss" scoped src="@/assets/css/werMenuSetting/menuSetting.scss"></style>
