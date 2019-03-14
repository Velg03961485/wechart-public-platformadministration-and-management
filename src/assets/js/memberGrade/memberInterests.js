import gradeApi from '@/api/grade'
export default {
  name: "member-interests",
  data(){
    return{
      memberInterestsTableData:[],
      options: [],
      dialogTitle:'新增',
      FormVisible:false,
      formAddInterset:{
        name:'',
        image:'',
        content:'',
      },
      rules:{
        name:[
          {required: true, message: '请输入权益名称', trigger: 'blur'},
          {required: true,  message: '最多只能输入10个字符', trigger: 'change'}
        ],
        image:[
          {required: true, message: '请选择一种权益图标', trigger: 'blur'}
        ],
        content:[
          {required: true, message: '请填写权益内容', trigger: 'blur'}
        ]
      },
      pageSize:10,
      pageNum:1,
      isAddOrOld:true,
      changeOldId:0,
      pageCount:'',
      perPage:'',
      deleteForm:false,     //确认删除弹框
      isShowImgFor:false,     //图标列表默认隐藏
      getColor:-1,
      isSureDeleteId:-1,
      inputNumber:0,
      inputNumber2:0,
    }
  },
  created:function () {
    this.getImages()
    this.getListerList()
  },
  methods:{
    getListerList(){
      let list = {
        'pageSize':this.$data.pageSize,
        'pageNum':this.$data.pageNum
      }
      let qs = require('querystring')
      gradeApi.checkInsterList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.memberInterestsTableData = response.data.data.list;
        this.$data.pageCount = response.data.data.pages;
        this.$data.perPage = response.data.data.size;
      })
    },
    //获取会员权益图标
    getImages(){
      let list = {

      }
      let qs = require('querystring')
      gradeApi.getImagePointForInster(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.options = response.data.data.list
      })
    },
    //打开图标列表
    clickThisChooseIamge(){
      this.$data.isShowImgFor =! this.$data.isShowImgFor;
    },
    //选择一个图标
    getInfoImageUrl(index,val){
      console.log(index,val)
      this.$data.formAddInterset.image = val;
      // this.$data.getColor = 'backColor';
      this.getColor = index;
      this.$data.isShowImgFor =! this.$data.isShowImgFor;
    },
    //分页
    handleCurrentChange(val){
      this.$data.pageNum = val;
      this.getListerList();
    },
    handleEdit(val){
      console.log('编辑')
      this.$data.dialogTitle = '编辑';
      this.$data.FormVisible =! this.$data.FormVisible;
      //  数据默认
      this.$data.formAddInterset.name = '';
      this.$data.formAddInterset.image = '';
      this.$data.formAddInterset.content = '';
      console.log(val.id)
      this.$data.isAddOrOld = false;
      this.$data.changeOldId = val.id;
      let list = {
        'id':val.id,
      }
      let qs = require('querystring')
      gradeApi.checkOneThisInster(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.formAddInterset.name = response.data.data.name;
        this.$data.formAddInterset.image = response.data.data.imageName;   //这个后台应该反id有问题
        this.$data.formAddInterset.content = response.data.data.content;

      })
    },
    handleDelete(val){
      console.log('删除')
      console.log(val.id);
      this.$data.isSureDeleteId = val.id;
      this.$data.deleteForm =! this.$data.deleteForm;
    },
    //删除确认,取消
    overCancelDelete(){
      this.$data.deleteForm =! this.$data.deleteForm;
    },
    //删除确认,确认
    sureDelete(){
      let list = {
        'id':this.$data.isSureDeleteId,
      }
      let qs = require('querystring')
      gradeApi.deleteThisInsterForOne(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.end === 'success'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getListerList();
          this.$data.deleteForm =! this.$data.deleteForm;
        }else{
          this.$message.error('删除失败');
        }
      })
    },
    addNew(){
      console.log('新增');
      this.$data.dialogTitle = '新增';
      this.$data.FormVisible =! this.$data.FormVisible;
      this.$data.isAddOrOld = true;
    //  数据默认
      this.$data.formAddInterset.name = '';
      this.$data.formAddInterset.image = '';
      this.$data.formAddInterset.content = '';
      this.$data.isShowImgFor = false;
      this.$data.getColor = -1;
    },
  //  取消新增
    cancel(){
      this.$data.FormVisible =! this.$data.FormVisible;
      //  数据默认
      this.$data.formAddInterset.name = '';
      this.$data.formAddInterset.image = '';
      this.$data.formAddInterset.content = '';
    },
  //  确认提交
    submitForm(formAddInterset){
      this.$refs[formAddInterset].validate((valid) => {
        if(valid){
          let list = {
            'name':this.$data.formAddInterset.name,
            'imageUrl':this.$data.formAddInterset.image,
            'content':this.$data.formAddInterset.content
          }
          if(this.$data.isAddOrOld === true){
          //  新增
            let qs = require('querystring')
            gradeApi.addNewInsterForOne(qs.stringify(list)).then((response) => {
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getListerList();
              }else{
                this.$message.error(response.data.message);
              }
            })
          }else if(this.$data.isAddOrOld === false){
          //  更改
            list.id = this.$data.changeOldId;
            console.log(list);
            let qs = require('querystring')
            gradeApi.changeThisOneInster(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getListerList();
              }else{
                this.$message.error(response.data.message);
              }
            })
          }
          this.$data.FormVisible =! this.$data.FormVisible;
        }else{
          this.$message({
            type: 'warning',
            message: '请把信息填写完整',
          })
          return false;
        }
      })

    },
    getNumberInfo(val){
      this.$data.inputNumber = val.length;
    },
    getContentNumber(val){
      this.$data.inputNumber2 = val.length;
    },

  }
}
