
export default {
  name: "order-form-list",
  data(){
    return{
      cheFormOrder:{
        useValue1:'',
        useValue2:'',
        orderValue1:'',
        orderValue2:'',
      },
      tableDataOrderList:[
        {
          num:2108051523567,
          name:'小源',
          style:'黄金/戒指',
          number:1,
          money:2300,
          consumerTime:'2018.12.23',
          orderTime:'2018.12.30',
        }
      ],
    //  查询会员信息
      CheckInfoFormVisible:false,
      isInfoForMember:true,
      isInfoForPoint:false,
      pointDetailChange:[{
        time:'2018.23.12',
        type:'消费产生',
        takeNum:'+11',
        lastNum:'2000'
      }],
    }
  },
  methods:{
    //会员查询
    checkMemberInfo(){
      this.$data.CheckInfoFormVisible =!this.$data.CheckInfoFormVisible;
    },
    //新增
    addNew(){
      this.$router.push({
        path: 'placeOrder'
      })
    },
  //  搜索
    cheThisSearch(){

    },
  //  查看
    checkThisOrder() {

    },
  //  删除
    deleteThisOrder() {

    },
  //  查看积分明细
    cheThisPoint(){
      this.$data.isInfoForMember = false;
      this.$data.isInfoForPoint = true;
    },
  //  返回会员信息
    backMemberInfo(){
      this.$data.isInfoForMember = true;
      this.$data.isInfoForPoint = false;
    },
  },
}
