<template>
  <div class="guest-list-page">
    <!--新增-->
    <el-row>
      <el-col>
        <button class="btn" @click="add()">新建</button>
      </el-col>
    </el-row>
    <!--图文消息列表-->
    <el-table
      :data="tableData"
      border
      style="width: 100%;text-align:center;">
      <el-table-column
        label="序号"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
      >
        <template slot-scope="scope" style="text-align: center">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
      >
        <template slot-scope="scope">
          <!--<span style="margin-left: 10px">{{ scope.row.type }}</span>-->
          <img  :src="scope.row.url" alt="" style="width: 6rem;">
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="关键字"-->
        <!--&gt;-->
        <!--<template slot-scope="scope" style="text-align: center">-->
          <!--<span>{{scope.row.keyword}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="时间"
      >
        <template slot-scope="scope" style="text-align: center">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages" v-if="pageCount > 0" style="margin-top: 2rem;margin-left: 50%">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="perPage" :page-count = 'pageCount'>
      </el-pagination>
    </div>
    <!--新建模板-->
    <el-dialog :title="dialogTitle" :visible.sync="FormVisible" style="">
      <!--标签页-->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="内部图文" name="first">
            <el-form :model='formOfText' ref="formOfText" :rules="rules" label-width="200px" class="demo-ruleForm">
              <el-form-item label="标题" prop="name" >
                <el-input v-model="formOfText.name" class="listWidth"></el-input>
              </el-form-item>
              <el-form-item label="关键字" prop="keyword">
                <el-input v-model="formOfText.keyword"></el-input>
              </el-form-item>
              <el-form-item label="图片" prop="iamge">
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
              <el-form-item label="内容：">
                <quill-editor ref="myTextEditor" v-model="formOfText.content"
                              :content="content"
                              :options = "editorOption"
                              @change="onEditorChange($event)"
                              class="quill_editor">
                </quill-editor>
                <!--<quill-editor  class="editor"></quill-editor>-->
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!--链接图文-->
          <el-tab-pane label="链接图文" name="second">
            <el-form :model='formOfLink' ref="formOfLink" :rules="rules" label-width="150px" class="demo-ruleForm">
              <el-form-item label="标题" prop="name" >
                <el-input v-model="formOfLink.name" class="listWidth"></el-input>
              </el-form-item>
              <el-form-item label="关键字" prop="keyword">
                <el-input v-model="formOfLink.keyword"></el-input>
              </el-form-item>
              <el-form-item label="图片" prop="iamge">
                <el-upload
                  class="avatar-uploader"
                  :action="importFileUrl()"
                  :show-file-list="false"
                  :data="upLoadData"
                  :on-success="handleAvatarSuccessForLink"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrlLink" :src="imageUrlLink" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px solid forestgreen"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="文章链接" prop="link" >
                <el-input v-model="formOfLink.link" class="listWidth"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="@/assets/js/werMenuSetting/imageTextNews.js"></script>

<style lang="scss" scoped src="@/assets/css/werMenuSetting/imageTextNews.scss"></style>
