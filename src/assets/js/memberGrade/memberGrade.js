import gradeApi from '@/api/grade'
export default {
  name: "member-grade",
  data(){
    return{
      memberGradeTableData:[],
      dialogTitle:'新增',
      laberData:[
        {name:'V1',id:1},
        {name:'V2',id:2},
        {name:'V3',id:3},
        {name:'V4',id:4},
        {name:'V5',id:5}
      ],
      rules:{
        laber:[
          {required: true, message: '请选择会员等级', trigger: 'blur'},
        ],
        name:[
          {required: true, message: '请输入会员名称', trigger: 'blur'},
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        groupFirsts:[
          {required: true, message: '请输积分值', trigger: 'blur'}
        ],
        checkedInterest:[
          {required: true, message: '请选择一种会员权益', trigger: 'blur'}
        ]
      },
      interestData:[],
      formOfText:{
        laber:'',
        name:'',
        groupFirst:'',
        salePoints:'',
        checkedInterest:[],
        discountNumber:'',
      },
      FormVisible:false,
      pageSize:10,
      pageNum:1,
      isAddOrOld:true,
      changeOldId:0,
      pageCount:'',
      perPage:'',
      interData:[],
      canChoseLaber:false,
      inputNumber:0,
    }
  },
  created:function () {
    this.getGradeList()
    this.getInterest()
  },
  methods:{
    //获取会员等级列表
    getGradeList(){
      let list = {
        'pageSize':this.$data.pageSize,
        'pageNum':this.$data.pageNum
      }
      let qs = require('querystring')
      gradeApi.memberGradeList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.memberGradeTableData = response.data.data.list;
        this.$data.pageCount = response.data.data.pages;
        this.$data.perPage = response.data.data.size;
        // this.$data.interData = response.data.data.list.gradeRights;
        // console.log(this.$data.interData)
      })
    },
    //获取权益的数据
    getInterest(){
      let list = {
        'pageSize':100,
        'pageNum':1
      }
      let qs = require('querystring')
      gradeApi.checkInsterList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.interestData = response.data.data.list;
      })
    },
    //分页
    handleCurrentChange(val){
      this.$data.pageNum = val;
      this.getList();
    },
    addNew(){
      this.$data.dialogTitle = '新增';
      this.$data.FormVisible =! this.$data.FormVisible;
    //  默认值
      this.$data.formOfText.name = '';
      this.$data.formOfText.laber = '';
      this.$data.formOfText.discountNumber = '';
      this.$data.formOfText.groupFirst = '';
      this.$data.formOfText.salePoints = '';
      this.$data.formOfText.checkedInterest = [];
      this.$data.isAddOrOld = true;     //模式为新增
      this.$data.canChoseLaber = false;
    },
    handleEdit(val){
      console.log('编辑')
      this.$data.FormVisible =! this.$data.FormVisible;
      console.log(val.level)
      if(val.level === 0 || val.level === '' || val.level === null){
        this.$data.canChoseLaber = true;
        this.$data.formOfText.laber = 0;
      }else{
        this.$data.canChoseLaber = false;
        this.$data.formOfText.laber = '';
      }
      //  默认值
      this.$data.formOfText.name = '';
      this.$data.formOfText.discountNumber = '';
      this.$data.formOfText.groupFirst = '';
      this.$data.formOfText.salePoints = '';
      this.$data.formOfText.checkedInterest = [];
      this.$data.isAddOrOld = false;     //模式为修改
      console.log(val.id)
      this.$data.changeOldId = val.id;
      let list = {
        'id':val.id,
      }
      let qs = require('querystring')
      gradeApi.chexkThisGradeOne(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.formOfText.laber = response.data.data.level;
        this.$data.formOfText.name = response.data.data.gradeName;
        this.$data.formOfText.groupFirst = response.data.data.satisfiedMoney;
        this.$data.formOfText.salePoints = response.data.data.satisfiedPoints;

        console.log(response.data.data.gradeRights.split(',').map(Number))
        this.$data.formOfText.checkedInterest = response.data.data.gradeRights.split(',').map(Number);
        console.log(response.data.data.discount)
        if(response.data.data.discount === null){
          this.$data.formOfText.discountNumber = '';
        }else{
          this.$data.formOfText.discountNumber = response.data.data.discount;
        }
        console.log(this.$data.formOfText.discountNumber)

      })
    },
    handleDelete(val){
      console.log('删除')
      console.log(val.id);
      let list = {
        'id':val.id,
      }
      let qs = require('querystring')
      gradeApi.deleteTisGradeFor(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.end === 'success'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getGradeList();
        }else{
          this.$message.error('删除失败');
        }
      })
    },
  //  新增取消
    cancel(){
      this.$data.FormVisible =! this.$data.FormVisible;
    },
  //  确认新增/修改
    submitForm(formOfText){
      this.$refs[formOfText].validate((valid) => {
        if(valid){
          console.log(parseInt(this.$data.formOfText.groupFirst));
          if(this.$data.formOfText.groupFirst === '' && this.$data.formOfText.salePoints === ''){
            this.$message.error('请输入积分值');
            return;
          }
          // if(this.$data.formOfText.salePoints === ''){
          //   this.$message.error('请输入一次性消费额度');
          //   return;
          // }
          console.log(this.$data.formOfText.discountNumber)
          if(this.$data.formOfText.discountNumber !== '' && this.$data.formOfText.discountNumber !== null && this.$data.formOfText.discountNumber !== NaN && this.$data.formOfText.discountNumber !== undefined){
            if(this.$data.formOfText.discountNumber > 9.9 || this.$data.formOfText.discountNumber < 1){
              this.$message.error('请填写1-9.9折之间的数字');
              return;
            }
          }
          console.log(this.$data.formOfText)

          let list = {
            'level':this.$data.formOfText.laber,
            'gradeName':this.$data.formOfText.name,
            'satisfiedMoney':this.$data.formOfText.groupFirst,
            'satisfiedPoints':this.$data.formOfText.salePoints,
            'gradeRights':this.$data.formOfText.checkedInterest.join(','),
            'discount':this.$data.formOfText.discountNumber,
          }
          if(this.$data.isAddOrOld === true){
          //  新增

            console.log(list)
            let qs = require('querystring')
            gradeApi.addNewMemberGrade(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getGradeList();
              }else{
                this.$message.error(response.data.message);
              }
            })
          }else if(this.$data.isAddOrOld === false){
          //  修改
            list.id = this.$data.changeOldId;
            console.log(list);
            let qs = require('querystring')
            gradeApi.upDateThisOneForGrade(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getGradeList();
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
        }

      })

    },
    getNumberInfo(val){
      this.$data.inputNumber = val.length;
    },
  }
}
