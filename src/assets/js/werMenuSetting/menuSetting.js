import WXApi from '@/api/wxPost'
import commonApi from '@/api/common'
export default {
  name: "menu-setting",
  data(){
    return{
      FormVisible:false,
      dialogTitle:'',
      tableData:[],
      rules:{
        originalId:[
          {required: true, message: '请输入公众号ID', trigger: 'blur'},
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name:[
          {required: true, message: '请输入公众号名称', trigger: 'blur'},
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        appId:[
          {required: true, message: '请输入公众号appId', trigger: 'blur'},
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        appSecret:[
          {required: true, message: '请输入公众号appSecrt', trigger: 'blur'},
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // Token:[
        //   {required: true, message: '请输入公众号token', trigger: 'blur'},
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
      },
      formName:{
        originalId:'',
        name:'',
        appId:'',
        appSecret:'',
        stores:'',
        companyId:82,
      },
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      msg:'123',
      checkedIds:[],
      addOrChange:0,    //判断是新增一个还是编辑旧的
      changeId:0,     //修改公众号id
      pageSize:10,
      pageNum:1,
      pages:'',
      pageCount:'',
      perPage:'',
    };
  },
  created:function () {
    this.getList()
  },
  mounted:function(){

    // this.dialogVisible = false;
  },
  methods:{
    //获取列表值
    getList(){
      // console.log('嗲用')
      let list = {
        'companyId': 82,
        'pageSize':this.$data.pageSize,
        'pageNum':this.$data.pageNum
      }
      let qs = require('querystring')
      WXApi.WXUseList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.tableData = response.data.data.list;
        this.$data.pageCount = response.data.data.pages;
        this.$data.perPage = response.data.data.size;
      })

    },
    //分页
    handleCurrentChange(val){
      this.$data.pageNum = val;
      this.getList();
    },
    //获取组织架构
    getPartList(){
      let list = {

      }
      let qs = require('querystring')
      commonApi.getStoreCommonList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.data2 = response.data.data;
      })
    },
    handleClick(it){
      console.log(it);
      sessionStorage.setItem('setLeftMenuShow1', false)    //保存值，防止刷新的时候页面错误
      sessionStorage.setItem('setLeftMenuShow2', true)
      //向Main组件传值
      this.$emit('listenThis',false)

      this.$router.push({
        path: 'treeMap/' + it.originalId
      })
      sessionStorage.setItem('onlyWXId', it.originalId)    //保存值，防止刷新的时候丢掉
    },
    checkOut(it){
      this.$data.dialogTitle = '编辑公众号';
      this.$data.FormVisible = true;
      this.$data.addOrChange = 2;    //编辑
      this.$data.changeId = it.id;
      let list = {
        id:it.id
      };
      let qs = require('querystring')
      WXApi.checkOnlyOne(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.getPartList()
        this.$data.formName = response.data.data;
        this.$data.checkedIds = response.data.data.stores.split(',');
        console.log(this.$data.checkedIds)
      })
    },
    submitForm(formName){
      console.log(0);
      console.log(this.$data.checkedIds)
      this.$data.checkedIds = this.$refs.tree.getCheckedKeys();    //取到的勾选门店
      // this.$data.checkedIds = [2,3];    //模拟勾选的取到的勾选门店
      console.log(this.$data.checkedIds.join(','))
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.$data.checkedIds == ''){
            this.$message({
              type: 'warning',
              message: '请选择一个门店',
            })
          }else{
            this.$data.formName.stores = this.$data.checkedIds.join(',');

            if(this.$data.addOrChange === 1){
              // let list = this.$data.formName;
              // console.log(list)
              let list = {
                name:this.$data.formName.name,
                originalId:this.$data.formName.originalId,
                appId:this.$data.formName.appId,
                appSecret:this.$data.formName.appSecret,
                token:this.$data.formName.token,
                stores:this.$data.formName.stores,
                companyId:82
              };
              let qs = require('querystring')
              WXApi.AddNewWX(qs.stringify(list)).then((response) => {
                console.log(response.data.code);
                if(response.data.code === 0){
                  console.log('成功')
                  this.$message({
                    message: '新建成功',
                    type: 'success'
                  });
                  this.$data.FormVisible = false;
                  this.getList()
                }else if(response.data.code === 1){
                  console.log('失败')
                  this.$message.error(response.data.message);
                }
              })
            }else if(this.$data.addOrChange === 2){
              this.$data.formName.id = this.$data.changeId;
              delete this.$data.formName.creatTime;
              delete this.$data.formName.updateTime;
              let list = this.$data.formName;
              console.log(list)
              let qs = require('querystring')
              WXApi.ChangeOldWX(qs.stringify(list)).then((response) => {
                console.log(response.data.code);
                if(response.data.code === 0){
                  console.log('成功')
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$data.FormVisible = false;
                  this.getList()
                }else if(response.data.code === 1){
                  console.log('失败')
                  this.$message.error('修改失败');
                }
              })
            }

          }
        } else {
          this.$message({
            type: 'warning',
            message: '请把信息填写完整',
          })
          return false;
        }
      });

    },
    add(){
      this.$data.dialogTitle = '新建公众号';
      this.$data.addOrChange = 1;    //新增
      this.$data.FormVisible = true;
      this.getPartList()
      this.$data.formName.originalId = '';
      this.$data.formName.name = '';
      this.$data.formName.appId = '';
      this.$data.formName.appSecret = '';
      this.$data.formName.stores = '';
      this.$data.checkedIds = [];
      console.log(this.$data.checkedIds)
    },
    cancel(){
      this.$data.FormVisible = false;
      this.$data.formName.originalId = '';
      this.$data.formName.name = '';
      this.$data.formName.appId = '';
      this.$data.formName.appSecret = '';
      this.$data.formName.stores = '';
      this.$data.checkedIds = [];
    },
    deletThisWX(val){
      let list = {
        id:val.id
      };
      let qs = require('querystring')
      WXApi.deletThisWXOnly(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.code === 0){
          console.log('成功')
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList()
        }else if(response.data.code === 1){
          console.log('失败')
          this.$message.error('删除失败');
        }
      })
    },
  },
}
