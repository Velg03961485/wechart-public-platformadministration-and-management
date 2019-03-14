import integrationApi from '@/api/integral'
import commonApi from '@/api/common'
const textureList = [
  {name:'镶嵌类',id:1},
  {name:'黄金类',id:2},
  {name:'K金类',id:3},
  {name:'吊坠类',id:4},
  {name:'玉石类',id:5},
];
const goodStyleList = [
  {name:'款式一',id:1},
  {name:'款式二',id:2},
  {name:'款式三',id:3},
  {name:'款式四',id:4},
]
export default {
  name: "integration-rule",
  data(){
    return{
      integrationTableData:[],
      //不同type
      integraType:[
        {name:'比例型:获得消费金额固定比例的积分数',id:'0'},
        {name:'固定值型:获得固定值的积分数',id:'1'},
        {name:'倍数型:某时间内获得的积分数乘相应的倍数',id:'2'}
      ],
      timeTypeData:[
        {name:'',id:0}
      ],
      integrationForm:false,
      dialogTitle:'',
      FormVisible:false,
      laberData:[],
      formOfInter:{
        name:'',
        type:1,
        proportionFirst:'',
        proportionSecond:'',
        content:'',
        useValue1:'',
        useValue2:'',
        timeType:'',
        pointNumber:'',
        multipleNumber:''
      },
      rules:{
        type:[
          {required: true, message: '请选择规则类型', trigger: 'blur'},
        ],
        name:[
          {required: true, message: '请填写名称', trigger: 'blur'},
        ],
        proportionSecond:[
          {required: true, message: '请填写积分生成比例', trigger: 'blur'},
        ],
        pointNumber:[
          {required: true, message: '请填写积分数', trigger: 'blur'},
        ],
        multipleNumber:[
          {required: true, message: '请填写消费积分翻倍数', trigger: 'blur'},
        ],
        content:[
          {required: true, message: '请填写内容', trigger: 'blur'},
        ],
        useValue2:[
          {required: true, message: '请填写规则生效期', trigger: 'blur'},
        ],
        timeType:[
          {required: true, message: '请填写积分有效期', trigger: 'blur'},
        ]
      },
    //  品类多选
      checkAll: false,
      checkedCities: [],
      textureData: textureList,
      isIndeterminate: true,
      //选择款式
      checkAllStyle:false,     //默认全部不勾选
      checkedStyleList:[],     //选择的款式
      isStyleterminate:true,    //
      styleListData:goodStyleList,    //循环款式数据
      //门店树状图
      data2:[],
      checkedIds:[],    //选择的门店
      checkedIdForName:[],   //选择的门店名称
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    //  选择时间限制
      pickerOptionsSet: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
    //  删除
      deleteIntegration:false,
    //  测试
      isShowFirst:2,
      inputNumber:0,    //输入数默认为0
      inputNumber2:0,     //输入数默认为0
    //  分页
      pageSize:10,
      pageNum:1,
      pageCount:'',
      perPage:'',
      isAddOrSaveOld:true,     //新增还是更改
      isChangePostId:0,   //更改删除id值
      postTime1:'',
      postTime2:'',
      storeData:'',
      integrationTableDataAB:[],
      storeNameA:'',
      backA:'',
    }
  },
  created:function () {
    this.getList()
    this.getPartCommot()
    this.getTreeCommt()
  },
  methods:{
    //列表
    async getList(){
      let list = {
        'pageSize':this.$data.pageSize,
        'pageNum':this.$data.pageNum
      }
      let qs = require('querystring')
      await integrationApi.integrationListForm(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        let storeN = [];
        if(response.data.end === 'noData'){
          this.$data.isShowFirst = 1;
        }else{
          this.$data.isShowFirst = 2;
          this.$data.integrationTableData = response.data.data.list;
          this.$data.pageCount = response.data.data.pages;
          this.$data.perPage = response.data.data.size;
        }

      })
    },
    //分页
    handleCurrentChange(val){
      this.$data.pageNum = val;
      this.getList();
    },
    //组织架构
    getPartCommot(){
      let list = {

      }
      let qs = require('querystring')
      commonApi.getStoreCommonList(qs.stringify(list)).then((response) => {
        // console.log(response.data.data);
        this.$data.data2 = response.data.data;
      })
    },
    //品类材质标签
    getTreeCommt(){
      let list = {

      }
      let qs = require('querystring')
      commonApi.getTreeCommonList(qs.stringify(list)).then((response) => {
        // console.log(response.data.data);
        this.$data.textureData = response.data.data[0].children;
        this.$data.styleListData = response.data.data[1].children;
      })
    },
    //使用品类的选择
    handleCheckAllChange(val){
      this.checkedCities = val ? textureList : [];
      this.isIndeterminate = false;
      // console.log(this.checkedCities)
      let getCkeckArry = [];
      if(this.$data.checkAll == false){
        this.$data.checkedCities = [];
      }else if(this.$data.checkAll == true){
        // this.$data.checkedCities = [1,2,3,4,5]
        this.$data.textureData.forEach(function (value) {
          getCkeckArry.push(value.id)
        })
        console.log(getCkeckArry);
        this.$data.checkedCities = getCkeckArry;
      }
    },
    handleCheckedCitiesChange(value){
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.textureData.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.textureData.length;
      console.log(value);
    },
    //  款式选择
    handleCheckAllStyleChange(val){
      this.checkedStyleList = val ? goodStyleList : [];
      this.isStyleterminate = false;
      let styleArry = [];
      if(this.$data.checkAllStyle == false){
        this.$data.checkedStyleList = [];
      }else if(this.$data.checkAllStyle == true){
        // this.$data.checkedStyleList = [1,2,3,4,5]
        this.$data.styleListData.forEach(function (value) {
          styleArry.push(value.id)
        })
        this.$data.checkedStyleList = styleArry;
      }
    },
    handleCheckedStyleChange(value){
      console.log(value);
      let checkedStyle = value.length;
      this.checkAllStyle = checkedStyle === this.styleListData.length;
      this.isStyleterminate = checkedStyle > 0 && checkedStyle < this.styleListData.length;
      console.log(value);
    },
    //选择发放时间的范围判断
    getUseTimeForOne(){
      console.log(this.$data.formOfInter.useValue1)
      console.log(this.$data.formOfInter.useValue2/1000)
      if(this.$data.formOfInter.useValue1 === '' || this.$data.formOfInter.useValue1 === null || this.$data.formOfInter.useValue1 === undefined){
        this.$message.error('请先选择开始时间');
        this.$data.formOfInter.useValue2 = '';
        return;
      }else{
        if(this.$data.formOfInter.useValue1/1000 > this.$data.formOfInter.useValue2/1000){
          this.$message.error('开始时间必须小于结束时间');
          this.$data.formOfInter.useValue2 = '';
          return;
        }
      }
    },
    //选择一种类型新增
    choseTypeForInte(val){
      console.log(val)
      this.$data.formOfInter.type = val;
        this.$data.FormVisible =! this.$data.FormVisible;
        if(val === '1') {
          this.$data.laberData = [
            {name:'注册活动',id:1},
            {name:'签到活动',id:2}
          ]
        }else if(val === '2'){
          this.$data.laberData = [
            {name:'生日月',id:3},
            {name:'情人节',id:4},
            {name:'新年',id:5},
            {name:'七夕节',id:6},
            {name:'店庆',id:7},
            {name:'圣诞节',id:8},
            {name:'元旦',id:9},
          ]
        }
      // //  回复默认
      //   this.$data.formOfInter.type = 1;
        this.$data.formOfInter.name = '';
        this.$data.formOfInter.proportionFirst = '';
        this.$data.formOfInter.proportionSecond = '';
        this.$data.formOfInter.content = '';
        this.$data.formOfInter.useValue1 = '';
        this.$data.formOfInter.useValue2 = '';
        this.$data.formOfInter.timeType = '';
        this.$data.formOfInter.pointNumber = '';
        this.$data.formOfInter.multipleNumber = '';
        this.$data.inputNumber = 0;
        this.$data.inputNumber2 = 0;
        this.$data.checkedCities = [];
        this.$data.checkedStyleList = [];
    },
    addNew(){
      this.$data.integrationForm =! this.$data.integrationForm;
      this.$data.isAddOrSaveOld = true;   //新增模式
    },
    cancel(){
      this.$data.FormVisible =! this.$data.FormVisible;
    },
    //修改
    handleEdit(val){
      // //  回复默认
      //   this.$data.formOfInter.type = 1;
      this.$data.formOfInter.name = '';
      this.$data.formOfInter.proportionFirst = '';
      this.$data.formOfInter.proportionSecond = '';
      this.$data.formOfInter.content = '';
      this.$data.formOfInter.useValue1 = '';
      this.$data.formOfInter.useValue2 = '';
      this.$data.formOfInter.timeType = '';
      this.$data.formOfInter.pointNumber = '';
      this.$data.formOfInter.multipleNumber = '';
      this.$data.checkedCities = [];
      this.$data.checkedStyleList = [];
      this.$data.inputNumber = 0;
      this.$data.inputNumber2 = 0;
      console.log(val.id);
      this.$data.isAddOrSaveOld = false;   //修改模式
      this.$data.isChangePostId = val.id;
      let list = {
        'id':val.id,
      }
      let qs = require('querystring')
      integrationApi.checkoutThisIntegrationForOne(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.choseTypeForInte(response.data.data.type);
        this.$data.formOfInter.type = response.data.data.type;
        this.$data.formOfInter.name = response.data.data.name;
        this.$data.inputNumber = response.data.data.name.length;
        this.$data.checkedCities = response.data.data.texture.split(',').map(Number);
        this.$data.checkedStyleList = response.data.data.style.split(',').map(Number);
        if(response.data.data.type === '0'){
          this.$data.formOfInter.proportionFirst = response.data.data.percentMoneny;
          this.$data.formOfInter.proportionSecond = response.data.data.percentIntegral;
        }else if(response.data.data.type === '1'){
          this.$data.formOfInter.pointNumber = response.data.data.integralNum;
        }else if (response.data.data.type === '2'){
          this.$data.formOfInter.multipleNumber = response.data.data.integralDouble;
        }
        this.$data.formOfInter.content = response.data.data.content;
        this.$data.inputNumber2 = response.data.data.content.length;
        this.$data.formOfInter.useValue1 = new Date(response.data.data.effectStart).getTime();
        this.$data.formOfInter.useValue2 = new Date(response.data.data.effectEnd).getTime();
        this.$data.formOfInter.timeType = response.data.data.invalidDays;
        // this.$data.FormVisible =! this.$data.FormVisible;
      })
    },
    //删除
    handleDelete(val){
      this.$data.isChangePostId = val.id;
      this.$data.deleteIntegration =! this.$data.deleteIntegration;
    },
    //确认删除
    sureDeleteThis(){
      let list = {
        id:this.$data.isChangePostId,
      }
      let qs = require('querystring')
      integrationApi.deleteThisIntegrationFor(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        if(response.data.end === 'success'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList();
          this.$data.deleteIntegration =! this.$data.deleteIntegration;
        }else{
          this.$message.error('删除失败');
        }

      })
    },
    //取消删除
    cancelNoDelete(){
      this.$data.deleteIntegration =! this.$data.deleteIntegration;
    },
    submitForm(formOfInter){
      console.log(this.$data.formOfInter.useValue1)
      console.log(this.TimeOut(this.$data.formOfInter.useValue1/1000,2))
      // console.log(this.$data.checkedIds)
      this.$data.checkedIds = this.$refs.tree.getCheckedKeys();    //取到的勾选门店
      // console.log(this.$refs.tree.getCheckedNodes())
      for(let i = 0; i < this.$refs.tree.getCheckedNodes().length; i++){
        // console.log(this.$refs.tree.getCheckedNodes()[i]);
        // console.log(this.$refs.tree.getCheckedNodes()[i].name);
        this.$data.checkedIdForName.push(this.$refs.tree.getCheckedNodes()[i].name);   //取到勾选门店的name
      }
      // console.log(this.$data.checkedIdForName)
      // console.log(this.$refs.tree.getHalfCheckedKeys())
      // this.$data.checkedIds = [2,3];    //模拟勾选的取到的勾选门店
      this.$refs[formOfInter].validate((valid) => {
        if(valid){
          if(this.$data.checkedIds == ''){
            this.$message({
              type: 'warning',
              message: '请选择一个门店',
            })
            return;
          }

          if(this.$data.formOfInter.useValue1 === '' && this.$data.formOfInter.useValue2 === ''){
            this.$data.postTime1 = '';
            this.$data.postTime2 = '';
          }else{
            this.$data.postTime1 = this.TimeOut(this.$data.formOfInter.useValue1/1000,2);
            this.$data.postTime2 = this.TimeOut(this.$data.formOfInter.useValue2/1000,2);
          }
          let list = {
            'type':this.$data.formOfInter.type,
            'name':this.$data.formOfInter.name,
            'texture':this.$data.checkedCities.join(','),
            'style':this.$data.checkedStyleList.join(','),
            'percentMoneny':this.$data.formOfInter.proportionFirst,
            'percentIntegral':this.$data.formOfInter.proportionSecond,
            'shopsId':this.$data.checkedIds.join(','),
            'shopsName':this.$data.checkedIdForName.join(','),
            'content':this.$data.formOfInter.content,
            'integralNum':this.$data.formOfInter.pointNumber,
            'integralDouble':this.$data.formOfInter.multipleNumber,
            'effectStart':this.$data.postTime1,
            'effectEnd':this.$data.postTime2,
            'invalidDays':this.$data.formOfInter.timeType,
          }
          console.log(list)
          if(this.$data.isAddOrSaveOld === true){
          //  新增
            let qs = require('querystring')
            integrationApi.addnewCIntegrationFor(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getList();
                this.$data.isShowFirst = 2;
                this.$data.FormVisible =! this.$data.FormVisible;
                this.$data.integrationForm =! this.$data.integrationForm;
              }else{
                this.$message.error(response.data.message);
              }
            })
          }else if(this.$data.isAddOrSaveOld === false){
          //  修改
            list.id = this.$data.isChangePostId;
            console.log(list)
            let qs = require('querystring')
            integrationApi.sureSaveOldIntegration(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getList();
                this.$data.FormVisible =! this.$data.FormVisible;
              }else{
                this.$message.error(response.data.message);
              }
            })
          }
        }else{
          this.$message({
            type: 'warning',
            message: '请把信息填写完整',
          })
          return false;
        }
      })
    },
  //  输入计数
    getNumberInfo(val){
      this.$data.inputNumber = val.length;
    },
    getContentNumber(val){
      this.$data.inputNumber2 = val.length;
    },
  },
}
