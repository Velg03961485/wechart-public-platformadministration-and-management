import cardsApi from '@/api/cards'
import commonApi from '@/api/common'
import { Message, Loading } from 'element-ui';
let loading  //定义loading变量
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
const WXoperList = [
  {name:'湖州金店微信公众号',id:1},
  {name:'临平微信公众号',id:2},
  {name:'上海树龙微信公众号',id:3},
  {name:'普安微信公众号',id:4},
  {name:'云南微信公众号',id:5},
]
export default {
  name: "discount-list",
  data(){
    return{
      discountTableData:[],
      dialogTitle:'新增',
      FormVisible:false,
      checkAll: false,
      checkedCities: [],
      textureData: textureList,
      isIndeterminate: true,
      //选择款式
      checkAllStyle:false,     //默认全部不勾选
      checkedStyleList:[],     //选择的款式
      isStyleterminate:true,    //
      styleListData:goodStyleList,    //循环款式数据
      pickerOptionsSet: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e6
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      //选择卡券的类型
      cardsType:[
        {name:'代金券:消费满×元，减×元',id:'0'},
        {name:'折扣券:直接享受××折',id:'1'},
        {name:'满减券:每满××元，减××元',id:'2'}
      ],
      formAddDiscount:{
        type:'',    //优惠券类型
        name:'',    //优惠券名称
        subintName:'',     //副标题
        content:'',    //优惠券描述
        fullFirst:'',    //代金1
        fullSecond:'',   //代金2
        discountFirst:'',    //折扣1
        discountSecond:'',    //折扣2
        AllFullFirst:'',    //满减1
        AllFullSecond:'',    //满减2
        AllFullThird:'',     //满减3
        checkedTimeOne:true,    //勾选有效期
        useValue1:'',   //领取时间段1
        useValue2:'',    //领取时间段2
        takeValue1:'',    //使用时间段1
        takeValue2:'',     //使用时间段2
        checkedTimeTwo:false,    //勾选多少失效
        useForTime:'',       //时间日期
        usePeopleRadio:0,     //发放对象
        checkListUseType:[],     //其他限制
        stores:'',     //选取的门店
        pushAllNumber:'',    //发放数量
        overyOneGetNumber:'',    //每人领取多少张
        companyName:'',      //公司名称
        companyPhone:'',     //联系电话
      },
      imageUrl:'',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedIds:[],   //选择的门店
      //规则
      fillMoneyType:'',     //填写金额的动态规则名
      fillTimerType:'takeValue2',     //勾选时间的动态规则名
      rules:{
        type:[
          {required: true, message: '请选择优惠券类型', trigger: 'blur'},
        ],
        name:[
          {required: true, message: '请填写优惠券名称', trigger: 'blur'},
        ],
        fullFirst:[
          {required: true, message: '请填写金额', trigger: 'blur'},
        ],
        companyName:[
          {required: true, message: '请填写公司名称', trigger: 'blur'},
        ],
        companyPhone:[
          {required: true, message: '请填写联系电话', trigger: 'blur'},
        ],
        checkListUseType:[
          {required: true, message: '请填写其他限制', trigger: 'blur'},
        ],
        overyOneGetNumber:[
          {required: true, message: '请填写每人限领取张数', trigger: 'blur'},
        ],
        pushAllNumber:[
          {required: true, message: '请填写发放总数', trigger: 'blur'},
        ],
        usePeopleRadio:[
          {required: true, message: '请填写发放对象', trigger: 'blur'},
        ],
        subintName:[
          {required: true, message: '请填写副标题', trigger: 'blur'},
        ],
        content:[
          {required: true, message: '请填写优惠券描述', trigger: 'blur'},
        ],
        fullFirst:[
          {required: true, message: '请填写抵用金额', trigger: 'blur'},
        ],
        discountFirst:[
          {required: true, message: '请填写折扣金额', trigger: 'blur'},
        ],
        AllFullFirst:[
          {required: true, message: '请填写满减金额', trigger: 'blur'},
        ],
        takeValue2:[
          {required: true, message: '请选择发放使用时间', trigger: 'blur'},
        ],
        useForTime:[
          {required: true, message: '请填写领取有效期', trigger: 'blur'},
        ],
      },
      canUseFormTime:true,    //勾选时间，有效期默认不可填写
      canUseTakeTime:false,   //勾选时间，有效期时间段默认可填写
      chooseCardForm:false,    //第一个弹框选券种类
      isPostIndateType:'0',    //选择的时间类型传给后台
      isTypeCardFor:'0',
      changeColorOne:'fontBlue',
      changeColorTwo:'',
      chooseCardTypeFor:'',
    //  图片上传
      upLoadData: {
        access_token: 'NVfB8DOEbUjfmuYvSVXi6T591b_oiZ17',
      },
      postUrlIamge:'',
      //  分页
      pageSize:10,
      pageNum:1,
      pageCount:'',
      perPage:'',
      isAddOrSaveOld:true,     //新增还是更改
      isChangePostId:0,   //更改删除id值
    //  发送时间
      postTime1:'',
      postTime2:'',
      postTime3:'',
      postTime4:'',
    //  删除
      deleteCard:false,
    }
  },
  created:function () {
    this.getCardList()
    this.getPartCommot()
    this.getTreeCommt()
  },
  methods:{
    startLoading() { //使用Element loading-start 方法
      loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    endLoading() { //使用Element loading-close 方法
      loading.close()
    },
    getCardList(){
      let list = {
        'pageSize':this.$data.pageSize,
        'pageNum':this.$data.pageNum
      }
      let qs = require('querystring')
      cardsApi.cradListForAll(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        if(response.data.end === 'noData'){

        }else{

          this.$data.discountTableData = response.data.data.list;
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
        console.log(response.data.data);
        this.$data.data2 = response.data.data;
      })
    },
    //品类材质标签
    getTreeCommt(){
      let list = {

      }
      let qs = require('querystring')
      commonApi.getTreeCommonList(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.textureData = response.data.data[0].children;
        this.$data.styleListData = response.data.data[1].children;
      })
    },
    addNew(){
      this.$data.chooseCardForm =! this.$data.chooseCardForm;
      //  默认
      this.$data.changeColorOne = 'fontBlue';
      this.$data.changeColorTwo = '';
      this.$data.isTypeCardFor = '0';
      this.$data.chooseCardTypeFor = '';
      this.$data.isAddOrSaveOld = true;    //新增模式
    },
    //选择不同类 员工还是顾客卡
    chooseCardOne(){
      this.$data.changeColorOne = 'fontBlue';
      this.$data.changeColorTwo = '';
      this.$data.isTypeCardFor = '0';
    },
    chooseCardTwo(){
      this.$data.changeColorOne = '';
      this.$data.changeColorTwo = 'fontBlue';
      this.$data.isTypeCardFor = '1';
    },
    //选择不同类型新增
    choseTypeForInte(val){
      console.log(val)
      this.$data.chooseCardTypeFor = val;
      console.log(this.$data.isTypeCardFor);
      console.log(this.$data.chooseCardTypeFor);
      let title;
      if(this.$data.isAddOrSaveOld === true){
        title = '新建';
      }else if(this.$data.isAddOrSaveOld === false){
        title = '编辑';
      }
      if(this.$data.isTypeCardFor === '0' && this.$data.chooseCardTypeFor === '0'){
        this.$data.dialogTitle = title +  '用户代金券';
        this.$data.fillMoneyType = 'fullFirst';
      }else if(this.$data.isTypeCardFor === '0' && this.$data.chooseCardTypeFor === '1'){
        this.$data.dialogTitle = title + '用户折扣券';
        this.$data.fillMoneyType = '';
      }else if(this.$data.isTypeCardFor === '0' && this.$data.chooseCardTypeFor === '2'){
        this.$data.dialogTitle = title + '用户满减券';
        this.$data.fillMoneyType = 'AllFullFirst';
      }else if(this.$data.isTypeCardFor === '1' && this.$data.chooseCardTypeFor === '0'){
        this.$data.dialogTitle = title + '员工代金券';

      }else if(this.$data.isTypeCardFor === '1' && this.$data.chooseCardTypeFor === '1'){
        this.$data.dialogTitle = title + '员工折扣券';

      }else if(this.$data.isTypeCardFor === '1' && this.$data.chooseCardTypeFor === '2'){
        this.$data.dialogTitle = title + '员工满减券';

      }
      this.$data.FormVisible =! this.$data.FormVisible;
      //恢复默认
      // this.$refs.formAddDiscount.resetFields();
      this.$data.formAddDiscount.useValue1 = '';
      this.$data.formAddDiscount.useValue2 = '';
      this.$data.formAddDiscount.takeValue1 = '';
      this.$data.formAddDiscount.fullFirst = '';
      this.$data.formAddDiscount.fullSecond = '';
      this.$data.formAddDiscount.discountFirst = '';
      this.$data.formAddDiscount.discountSecond = '';
      this.$data.formAddDiscount.AllFullFirst = '';
      this.$data.formAddDiscount.AllFullSecond = '';
      this.$data.formAddDiscount.AllFullThird = '';
      this.$data.formAddDiscount.name = '';
      this.$data.formAddDiscount.subintName = '';
      this.$data.formAddDiscount.usePeopleRadio = 0;
      this.$data.formAddDiscount.pushAllNumber = '';
      this.$data.formAddDiscount.overyOneGetNumber = '';
      this.$data.formAddDiscount.checkListUseType = [];
      this.$data.formAddDiscount.content = '';
      this.$data.formAddDiscount.companyName = '';
      this.$data.formAddDiscount.companyPhone = '';
      this.$data.checkedCities = [];
      this.$data.checkedStyleList = [];
      this.imageUrl = ''
    },
    //限制现金券
    getThisInfoFull(val){
      if(this.$data.formAddDiscount.fullFirst === ''){
        this.$message.error('请先填写代金券金额!');
        this.$data.formAddDiscount.fullSecond = '';
        return;
      }
      if(val !== ''){
        if(this.$data.formAddDiscount.fullFirst >= this.$data.formAddDiscount.fullSecond){
          this.$message.error('上限金额不能小于抵用金额!');
          this.$data.formAddDiscount.fullSecond = '';
          return;
        }
      }
    },
    //限制折扣
    getThisInfoDiscount(val){
      if(val > 9.9){
        this.$message.error('可填入的折扣1-9.9折!');
        this.$data.formAddDiscount.discountFirst = '';
      }
    },
    //满减券限制
    getThisInfoAllFull(val){
      if(this.$data.formAddDiscount.AllFullFirst === ''){
        this.$message.error('请先填写满减金额!');
        this.$data.formAddDiscount.AllFullFirst = '';
        return;
      }
      if(val !== ''){
        if(parseInt(this.$data.formAddDiscount.AllFullSecond) >= parseInt(this.$data.formAddDiscount.AllFullFirst)){
          this.$message.error('所减金额不能大于满足金额!');
          this.$data.formAddDiscount.AllFullSecond = '';
          return;
        }
      }
    },
    getThisInfoAllFullThree(val){
      if(this.$data.formAddDiscount.AllFullFirst === '' || this.$data.formAddDiscount.AllFullSecond === ''){
        this.$message.error('请先填写满减金额!');
        this.$data.formAddDiscount.AllFullThird = '';
        return;
      }
      if(val !== ''){
        if(parseInt(this.$data.formAddDiscount.AllFullFirst) >= parseInt(this.$data.formAddDiscount.AllFullThird)){
          this.$message.error('满减金额不能大于上限金额!');
          this.$data.formAddDiscount.AllFullThird = '';
          return;
        }
      }
    },
    //上传图片动态地址
    importFileUrl() {
      return global.LOADUP_IMAGES
      // return JavaApi.UPLOGINIAMGE
    },
    handleAvatarSuccess(res, file) {
      console.log(res.data.fullpath);
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$data.postUrlIamge = res.data.fullpath;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      //限制宽高
      // const isWidth = file.width > 850;
      // const isHeight = file.height > 350;

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      // if(!isWidth || !isHeight){
      //   this.$message.error('上传图片像素不能超过 850*350!');
      // }
      return isLt2M ;
    },
    //选择不同的时间方式
    chooseTimeTypeCheck(){
      // console.log(1)
      if(this.$data.formAddDiscount.checkedTimeOne === true){
        this.$data.formAddDiscount.checkedTimeTwo = false;
        this.$data.fillTimerType = 'takeValue2';
        this.$data.canUseTakeTime = false;
        this.$data.canUseFormTime = true;
        this.$data.isPostIndateType = '0';    //传给后台的选择时间格式
      }else{
        this.$data.formAddDiscount.checkedTimeTwo = true;
        this.$data.fillTimerType = 'useForTime';
        this.$data.canUseTakeTime = true;
        this.$data.canUseFormTime = false;
        this.$data.isPostIndateType = '1';    //传给后台的选择时间格式
      }
    },
    chooseTimeTypeSelect(){
      // console.log(2)
      if(this.$data.formAddDiscount.checkedTimeTwo === true){
        this.$data.formAddDiscount.checkedTimeOne = false;
        this.$data.fillTimerType = 'useForTime';
        this.$data.canUseTakeTime = true;
        this.$data.canUseFormTime = false;
        this.$data.isPostIndateType = '1';    //传给后台的选择时间格式
      }else{
        this.$data.formAddDiscount.checkedTimeOne = true;
        this.$data.fillTimerType = 'takeValue2';
        this.$data.canUseTakeTime = false;
        this.$data.canUseFormTime = true;
        this.$data.isPostIndateType = '0';    //传给后台的选择时间格式
      }
    },
    //选择发放时间的范围判断
    getUseTimeForOne(){
      console.log(this.$data.formAddDiscount.useValue1)
      console.log(this.$data.formAddDiscount.useValue2/1000)
      if(this.$data.formAddDiscount.useValue1 === '' || this.$data.formAddDiscount.useValue1 === null || this.$data.formAddDiscount.useValue1 === undefined){
        this.$message.error('请先选择开始时间');
        this.$data.formAddDiscount.useValue2 = '';
        return;
      }else{
        if(this.$data.formAddDiscount.useValue1/1000 > this.$data.formAddDiscount.useValue2/1000){
          this.$message.error('开始时间必须小于结束时间');
          this.$data.formAddDiscount.useValue2 = '';
          return;
        }
      }
    },
    //判断选择使用时间不能小于发放时间
    getTakeTimeForOneLast(){
      if(this.$data.formAddDiscount.useValue2 === '' || this.$data.formAddDiscount.useValue2 === null || this.$data.formAddDiscount.useValue2 === undefined){
        this.$message.error('请先选择发放时间');
        this.$data.formAddDiscount.takeValue1 = '';
        return;
      }else{
        if(this.$data.formAddDiscount.useValue2/1000 > this.$data.formAddDiscount.takeValue1/1000){
          this.$message.error('发放时间必须小于使用时间');
          this.$data.formAddDiscount.takeValue1 = '';
          return;
        }
      }
    },
    //选择使用时间的范围
    getTakeTimeForTwo() {
      if(this.$data.formAddDiscount.takeValue1 === '' || this.$data.formAddDiscount.takeValue1 === null || this.$data.formAddDiscount.takeValue1 === undefined){
        this.$message.error('请先选择开始时间');
        this.$data.formAddDiscount.takeValue2 = '';
        return;
      }else{
        if(this.$data.formAddDiscount.takeValue1/1000 > this.$data.formAddDiscount.takeValue2/1000){
          this.$message.error('开始时间必须小于结束时间');
          this.$data.formAddDiscount.takeValue2 = '';
          return;
        }
      }
    },
    //使用品类的选择
    handleCheckAllChange(val){
      this.checkedCities = val ? textureList : [];
      this.isIndeterminate = false;
      let getCkeckArry = [];
      if(this.$data.checkAll == false){
        this.$data.checkedCities = [];
      }else if(this.$data.checkAll == true){
        // this.$data.checkedCities = [1,2,3,4,5]
        this.$data.textureData.forEach(function (value) {
          getCkeckArry.push(value.id)
        })
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
  //  选择其他限制
    handelThisUseType(value){
      console.log(value);
    },
    //查看并修改
    handleEdit(val){
      console.log(val.id)
      // this.$data.FormVisible =! this.$data.FormVisible;
      this.$data.isAddOrSaveOld = false;    //修改模式
      this.$data.isChangePostId = val.id;
      let list = {
        id:val.id,
      }
      let qs = require('querystring')
      cardsApi.checkoutThisCardForOne(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.isTypeCardFor =  response.data.data.category;
        this.choseTypeForInte(response.data.data.type);
      //  回填数据
        if(response.data.data.type === '0'){
          this.$data.formAddDiscount.fullFirst = response.data.data.couponMoney;
          this.$data.formAddDiscount.fullSecond = response.data.data.couponFull;
        }else if(response.data.data.type === '1'){
          this.$data.formAddDiscount.discountFirst = response.data.data.couponDiscount;
          this.$data.formAddDiscount.discountSecond = response.data.data.couponTop;
        }else if(response.data.data.type === '2'){
          this.$data.formAddDiscount.AllFullFirst = response.data.data.couponFull;
          this.$data.formAddDiscount.AllFullSecond = response.data.data.couponMinus;
          this.$data.formAddDiscount.AllFullThird = response.data.data.couponTop;
        }
        this.$data.formAddDiscount.name = response.data.data.name;
        this.$data.formAddDiscount.subintName = response.data.data.subName;
        if(response.data.data.indateType === '0'){
          this.$data.formAddDiscount.checkedTimeOne = true;
          this.$data.formAddDiscount.checkedTimeTwo = false;
          this.chooseTimeTypeCheck();
          this.$data.formAddDiscount.useValue1 = new Date(response.data.data.giveStart).getTime();
          this.$data.formAddDiscount.useValue2 = new Date(response.data.data.giveEnd).getTime();
          this.$data.formAddDiscount.takeValue1 = new Date(response.data.data.useStart).getTime();
          this.$data.formAddDiscount.takeValue2 = new Date(response.data.data.useEnd).getTime();
        }else if (response.data.data.indateType === '1'){
          this.$data.formAddDiscount.checkedTimeOne = false;
          this.$data.formAddDiscount.checkedTimeTwo = true;
          this.chooseTimeTypeSelect();
          this.$data.formAddDiscount.useForTime = response.data.data.invalidDays;
        }
        this.$data.checkedCities = response.data.data.texture.split(',').map(Number);
        this.$data.checkedStyleList = response.data.data.style.split(',').map(Number);
        this.$data.formAddDiscount.usePeopleRadio = parseInt(response.data.data.giveType);
        this.imageUrl = response.data.data.imageUrl;
        this.$data.formAddDiscount.pushAllNumber = response.data.data.giveCount;
        this.$data.formAddDiscount.overyOneGetNumber = response.data.data.getMax;
        this.$data.formAddDiscount.checkListUseType = response.data.data.otherLimit.split(',').map(Number);
        this.$data.formAddDiscount.content = response.data.data.describe;
        this.$data.formAddDiscount.companyName = response.data.data.company;
        this.$data.formAddDiscount.companyPhone = response.data.data.phone;
      })
    },
    //取消
    cancel(){
      this.$data.FormVisible =! this.$data.FormVisible;
      this.$refs.formAddDiscount.resetFields();
      this.$data.formAddDiscount.useValue1 = '';
      this.$data.formAddDiscount.useValue2 = '';
      this.$data.formAddDiscount.takeValue1 = '';
      this.$data.formAddDiscount.fullFirst = '';
      this.$data.formAddDiscount.fullSecond = '';
      this.$data.formAddDiscount.discountFirst = '';
      this.$data.formAddDiscount.discountSecond = '';
      this.$data.formAddDiscount.AllFullFirst = '';
      this.$data.formAddDiscount.AllFullSecond = '';
      this.$data.formAddDiscount.AllFullThird = '';
      // this.$data.formAddDiscount.fullSecond = '';
    },
  //  删除
    handleDelete(val){
      this.$data.isChangePostId = val.id;
      this.$data.deleteCard =! this.$data.deleteCard;
    },
  //  取消删除
    cancelNoDelete(){
      this.$data.deleteCard =! this.$data.deleteCard;
    },
  //  确认删除
    sureDeleteThis(){
      let list = {
        id:this.$data.isChangePostId,
      }
      let qs = require('querystring')
      cardsApi.deleteThisCardForOne(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        if(response.data.end === 'success'){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getCardList();
          this.$data.deleteCard =! this.$data.deleteCard;
        }else{
          this.$message.error('删除失败');
        }

      })

    },
  //  新增确认添加
    submitForm(formAddDiscount){
      console.log(this.$data.checkedIds)
      this.startLoading();
      this.$data.checkedIds = this.$refs.tree.getCheckedKeys();    //取到的勾选门店
      // this.$data.checkedIds = [2,3];    //模拟勾选的取到的勾选门店
      console.log(this.$data.checkedCities);
      console.log(this.$data.formAddDiscount.usePeopleRadio)
      console.log(this.$data.formAddDiscount.checkListUseType)
      this.$refs[formAddDiscount].validate((valid) => {
        if(valid){
          if(this.$data.checkedIds == ''){
            this.$message({
              type: 'warning',
              message: '请选择一个门店',
            })
            return;
          }
          let moneyA, moneyB, moneyC, moneyD, moneyE;
          if(this.$data.chooseCardTypeFor === '0'){
            moneyA = this.$data.formAddDiscount.fullFirst;
            moneyB = this.$data.formAddDiscount.fullSecond;
            moneyC = '';
            moneyD = '';
            moneyE = '';
          }else if(this.$data.chooseCardTypeFor === '1'){
            moneyA = '';
            moneyB = '';
            moneyC = '';
            moneyD = this.$data.formAddDiscount.discountSecond;
            moneyE = this.$data.formAddDiscount.discountFirst;
          }else if(this.$data.chooseCardTypeFor === '2'){
            moneyA = '';
            moneyB = this.$data.formAddDiscount.AllFullFirst;
            moneyC = this.$data.formAddDiscount.AllFullSecond;
            moneyD = this.$data.formAddDiscount.AllFullThird;
            moneyE = '';
          }
          if(this.$data.isPostIndateType === '0'){
            this.$data.postTime1 = this.TimeOut(this.$data.formAddDiscount.useValue1/1000,2);
            this.$data.postTime2 = this.TimeOut(this.$data.formAddDiscount.useValue2/1000,2);
            this.$data.postTime3 = this.TimeOut(this.$data.formAddDiscount.takeValue1/1000,2);
            this.$data.postTime4 = this.TimeOut(this.$data.formAddDiscount.takeValue2/1000,2);
          }else if(this.$data.isPostIndateType === '1'){
            this.$data.postTime1 = '';
            this.$data.postTime2 = '';
            this.$data.postTime3 = '';
            this.$data.postTime4 = '';
          }
          //测试用，后期删除
          if(this.imageUrl === ''){
            this.imageUrl = 'http://goldsys.oss-cn-hangzhou.aliyuncs.com/1542335825869.png'
          }else{
            this.imageUrl = this.imageUrl;
          }
          let list = {
            category:this.$data.isTypeCardFor,     //券种
            type:this.$data.chooseCardTypeFor,     //类型:0代金券,1折扣券,2满减券
            couponMoney:moneyA,    //优惠券金额
            couponFull:moneyB,     //满XX元(可用)
            couponMinus:moneyC,    //减XX元
            couponTop:moneyD,     //XX元封顶
            couponDiscount:moneyE,    //优惠券折扣
            name:this.$data.formAddDiscount.name,     //主题
            subName:this.$data.formAddDiscount.subintName,    //副标题
            indateType:this.$data.isPostIndateType,   //有效期类型:0发放时间段,1使用时间段
            giveStart:this.$data.postTime1,    //发放开始日期 例:2018-12-06
            giveEnd:this.$data.postTime2,     //发放结束日期 例:2018-12-06
            useStart:this.$data.postTime3,    //使用开始日期 例:2018-12-06
            useEnd:this.$data.postTime4,    //使用结束日期
            invalidDays:this.$data.formAddDiscount.useForTime,   //领取后多少天失效
            texture:this.$data.checkedCities.join(','),    //材质
            style:this.$data.checkedStyleList.join(','),    //款式
            shopsId:this.$data.checkedIds.join(','),   //适用门店
            giveType:this.$data.formAddDiscount.usePeopleRadio.toString(),   //类型:0所有人,1微信注册的新用户
            giveCount:this.$data.formAddDiscount.pushAllNumber,    //发放总数
            getMax:this.$data.formAddDiscount.overyOneGetNumber,    //每人限领取多少张
            otherLimit:this.$data.formAddDiscount.checkListUseType.join(','),   //其它限制:0不可叠加,1不与其它活动同时用,2不与会员卡同时用,3不与积分同时用
            imageUrl:this.imageUrl,   //活动营销图
            describe:this.$data.formAddDiscount.content,   //优惠券描述
            company:this.$data.formAddDiscount.companyName,    //公司名称
            phone:this.$data.formAddDiscount.companyPhone,    //联系电话
          }
          console.log(list)
          if(this.$data.isAddOrSaveOld === true){
          //  新增
            let qs = require('querystring')
            cardsApi.addNewCardForOne(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getCardList();
                this.endLoading();
                this.$data.FormVisible =! this.$data.FormVisible;
                this.$data.chooseCardForm =! this.$data.chooseCardForm;
              }else{
                this.$message.error(response.data.message);
              }
            })
          }else if(this.$data.isAddOrSaveOld === false){
          //  修改
            list.id = this.$data.isChangePostId;
            console.log(list);
            let qs = require('querystring')
            cardsApi.saveOneCardForThis(qs.stringify(list)).then((response) => {
              console.log(response.data);
              if(response.data.end === 'success'){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.getCardList();
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
  //  查看详情
    checkOutThisDetail(val) {
      this.$router.push({
        path: 'discountDetails/'+ val.id
      })
    }
  }
}

