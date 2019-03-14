export default {
  name: "member-list",
  data(){
    return{
      memberGrade:[
        {value:1,label:'黄金会员'},
        {value:2,label:'砖石会员'}
      ],     //会员等级
      form:{
        memberId:'',
        name:'',
        phone:'',
        grading:'',
        useValue1:'',
        useValue2:'',
      },
      tableData: [{
        id:12,
        name: '王小虎',
        address: '铂金会员',
        phone:15655656683
      }],
      pickerOptionsSet: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
    }
  },
  methods:{
    checkThisMember(){
      console.log(0)
      this.$router.push({
        path: '/memberDetail'
      })
    },
    //选择发放时间的范围判断
    getUseTimeForOne(){
      console.log(this.$data.form.useValue1)
      console.log(this.$data.form.useValue2/1000)
      if(this.$data.form.useValue1 === '' || this.$data.form.useValue1 === null || this.$data.form.useValue1 === undefined){
        this.$message.error('请先选择开始时间');
        this.$data.form.useValue2 = '';
        return;
      }else{
        if(this.$data.form.useValue1/1000 > this.$data.form.useValue2/1000){
          this.$message.error('开始时间必须小于结束时间');
          this.$data.form.useValue2 = '';
          return;
        }
      }
    },
    //按条件搜索
    cheThisSearch(){
      console.log(this.$data.form);
      if(this.$data.form.phone != ''){
        if (this.$data.form.phone.match(/^(13[0-9]|14[56789]|15[0-3,5-9]|16[6]|17[012345678]|18[0-9]|19[89])\d{8}$/)){
          console.log('匹配')
        }else{
          console.log('不匹配')
          this.$message.error('请输入正确的手机号');
        }
      }

    },
  }
}
