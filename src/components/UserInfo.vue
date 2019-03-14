<template>
	<div class="user-info-box">
        <div class="user-info-detail" v-if="!infoEdit">
            <ul class="detail-left">
                <li class="user-name">姓名： {{userInfo.name}}</li>
                <li class="user-phone">手机号码： {{userInfo.phone}}</li>
                <li class="user-sex">性别： {{userInfo.gender == 1 ? '男' : '女'}}</li>
                <li class="user-age">年龄： {{userInfo.age}}</li>
                <li class="user-type">类型： {{userInfo.vip_level == 0 ? '普通' : 'VIP'}}</li>
            </ul>
            <div class="img-box">
                <div class="img-wrap">
                    <img :src="userInfo.avatar" alt="人脸图像">
                </div>
                <div class="img-id">人脸ID：{{userInfo.id}}</div>
            </div>
            <div class="user-tags">
                标签： 
                    <el-tag v-for="(item,key) in userInfo.tag" :key="key" style="margin-right:10px;">{{userInfo.tag[key].name}}</el-tag>
            </div>
            <p class="user-remarks">备注： {{userInfo.remark === null ? '暂无备注' : userInfo.remark}}</p>
            <el-button type="primary" plain size="small" class="edit-btn" @click="editUserInfo()">编辑</el-button>
        </div>

        <div class="user-info-edit" v-if="infoEdit">
           <el-form :model="editUserInfoData" :rules="UserInfoRules" ref="editUserInfoData" label-width="100px" class="demo-editUserInfoData" size="mini" style="float:left;margin-right:50px;width:400px;">
              <el-form-item label="姓名：" prop="name" >
                <el-input v-model="editUserInfoData.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="editUserInfoData.phone"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="editUserInfoData.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄：" >{{editUserInfoData.age}}</el-form-item>
              <el-form-item label="类型：">{{editUserInfoData.vip_level == 0 ? '普通' : 'VIP'}}</el-form-item>
              <el-form-item label="年龄：" >{{editUserInfoData.age}}</el-form-item>
              <el-form-item label="标签：">
                <div v-for="label in labels" :key="label.id" class="labels">
                    <div>—— {{label.name}} ——</div>
                    <span v-for="children in label.children" :key="children.id">{{children.name}}</span>
                </div>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="editUserInfoData.remark"></el-input>
              </el-form-item>
          </el-form>
          <div class="img-box">
            <div class="img-wrap">
                <img :src="editUserInfoData.avatar" alt="人脸图像">
            </div>
            <div class="img-id">人脸ID：{{editUserInfoData.id}}</div>
          </div>
          <el-row class="userInfoEdit-wrap">
                <el-button plain size="small" @click="userInfoCancel">取消</el-button>
                <el-button type="primary" plain size="small" @click="userInfoSubmit('editUserInfoData')">确定</el-button>
          </el-row>
        </div>
	</div>
</template>
<script>
    import remindApi from '../api/remind'
    export default {
      	name:'user-info',
        props:{
            customerId:{
                type:Number
            },
            showInfoEdit:{
                type:Boolean
            }
        },
        data() {
            return {
                infoEdit:false,
                userInfo:{},
                editUserInfoData:{},
                labels:{},
                UserInfoRules:{
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
                    ],
                    gender:[
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    phone:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        {
                            validator: (rule, value, callback) => {
                                if (value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
                                    callback();
                                } else {
                                    callback("请输入正确的手机号码！");
                                }
                            },
                            trigger: 'blur'
                        }
                    ]

                }
            };
        },
        watch: {
          customerId: function() {
             this.personalInfo(this.$props.customerId)
          },
          
        },
        created:function(){
            this.personalInfo(this.$props.customerId)
            this.getAll(this.$props.customerId)
        },
        methods: {
            getAll(customerId){
                let list = {
                    'all': '1',
                    'customer_id': customerId
                }
                let qs = require('querystring')
                remindApi.getAll(qs.stringify(list)).then((res) => {
                    if(res.data.errno === 0){
                        this.$data.labels = res.data.data
                    }else{

                    }
                })
            },

            personalInfo(customerId){
                this.$data.infoEdit = this.$props.showInfoEdit;
                let qs = require('querystring')
                remindApi.personalInfo(qs.stringify({
                    'customer_id':customerId
                })).then((res) => {
                    if(res.data.errno === 0){
                        this.$data.userInfo = res.data.data
                    }else{

                    }
                })
            },
            editUserInfo(){
                this.$data.editUserInfoData = this.$data.userInfo;
                this.$data.infoEdit = true;
            },
            userInfoCancel(){
                this.$data.infoEdit = false;
            },
            userInfoSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            let qs = require('querystring')
                            remindApi.editPersonalInfo(qs.stringify({
                                customer_id:this.$data.editUserInfoData.customer_id,
                                name       :this.$data.editUserInfoData.name,    
                                phone      :this.$data.editUserInfoData.phone,   
                                gender     :this.$data.editUserInfoData.gender, 
                                tag_ids    :this.$data.editUserInfoData.tag_ids,
                                remark     :this.$data.editUserInfoData.ramark,
                            })).then((res) => {
                                if(res.data.errno === 0){
                                    this.userInfoCancel();
                                    this.personalInfo(this.$props.customerId)
                                }else{

                                }
                        })
                    }
                })
            }
        }
    };
</script>
<style lang="scss" scoped>
  .user-info-box{
    position: relative;
    padding:20px 0;
    .user-info-detail{
        margin:0 auto;
        width: 450px;
        overflow:hidden;
        .detail-left{
            float: left;
        }
        .img-box{
            float: right;
            width: 160px;
            height: 130px;
            text-align:center;
            .img-wrap{
                width:100px;
                img{
                    width:100%;
                }
            }
            .img-id{
                line-height:30px;
            }
            
        }
        .detail-left li,.user-tags,.user-remarks{
            margin-bottom:10px;
        }
        .user-tags{
            line-height:40px;
        }
        .user-tags,.user-remarks{
            clear:both;
            overflow:hidden;
        }
        .user-remarks{margin-bottom:40px;line-height:24px;}
    }
    .edit-btn{
        position: absolute;
        right:0;
        bottom:0;
    }
    .user-info-edit{
        position: relative;
        overflow:hidden;
        .img-box{
            float: left;
            width: 160px;
            height: 130px;
            text-align:center;
            .img-wrap{
                width:100px;
                img{
                    width:100%;
                }
            }
            .img-id{
                line-height:30px;
            }
            
        }
        .userInfoEdit-wrap{
            position: absolute;
            right:0;
            bottom:15px;
        }
    }
    .labels{
        font-size: 12px;
        div{
            color:#999;
        }
        span{
            display:inline-block;
            padding: 0 10px;
            height: 32px;
            line-height: 30px;
            color: #999;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid #999;
            white-space: nowrap;
            margin:0 5px 5px 0;
        }
        .border{
            color:#409eff;
            border: 1px solid #409eff;;
        }
    }
  }
</style>