import figureImage from '@/views/memberInfoDetail/figureImage'
import expenseRecord from '@/views/memberInfoDetail/expenseRecord'
import interGralRecord from '@/views/memberInfoDetail/interGralRecord'
import discountCoupon from '@/views/memberInfoDetail/discountCoupon'
import maintenanceRecord from '@/views/memberInfoDetail/maintenanceRecord'
import shoppingGuide from '@/views/memberInfoDetail/shoppingGuide'
export default {
  name: "member-detail",
  components: {
    figureImage,
    expenseRecord,
    interGralRecord,
    discountCoupon,
    maintenanceRecord,
    shoppingGuide,
  },
  data(){
    return{
      activeName:'first',
    }
  },
  methods:{
    handleClick(){

    },
    backMemberList(){
      console.log('返回');
      this.$router.push({
        path: 'memberList'
      })
    },
  }
}
