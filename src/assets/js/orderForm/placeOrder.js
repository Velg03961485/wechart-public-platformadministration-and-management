export default {
  name: "place-order",
  data(){
    return{
      consumption:{

      },
      shoppingGuideData:[
        {name:'小童',id:1},
        {name:'小源',id:2}
      ],
      activeName:'first',
      cardListData:[
        {img:'',name:'湖州金店1',subName:'黄金满减券',type:'满减券',time:'2018.12.3-2018.12.30',id:1},
        {img:'',name:'湖州金店2',subName:'黄金满减券',type:'满减券',time:'2018.12.3-2018.12.30',id:2},
        {img:'',name:'湖州金店3',subName:'黄金满减券',type:'满减券',time:'2018.12.3-2018.12.30',id:3},
        {img:'',name:'湖州金店4',subName:'黄金满减券',type:'满减券',time:'2018.12.3-2018.12.30',id:4},
        {img:'',name:'湖州金店5',subName:'黄金满减券',type:'满减券',time:'2018.12.3-2018.12.30',id:5},
      ],
      number:0,
    }
  },
  methods:{
    //卡券切换
    handleClick(tab, event){
      // console.log(tab, event);
    },
  //  选择一张卡券
    choseThisCard(val){
      console.log(val)
      this.$data.number = val.id;
    },
  },
}
