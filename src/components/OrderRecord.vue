<template>
	<div class="order-record-box">
		<h3 class="top-box">总成交金额：{{orderRecords.count_price}}元</h3>
		<ul class="store-record-list">
			<li class="store-record-item" v-for="(item,key) in orderRecords.list">
				<div>订单编号：{{orderRecords.list[key].sn}}</div>
				<div>收银时间：{{orderRecords.list[key].cash_t}}</div>
				<div>商品名：{{orderRecords.list[key].goods_name}}</div>
				<div>成交金额：{{orderRecords.list[key].price}}元</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import remindApi from '../api/remind'
	export default{
		name:'order-record',
		props:{
            customerId:{
                type:Number
            }
        },
		data(){
			return{
				orderRecords:{}
			}
		},
		watch: {
          customerId: function() {
             this.orderRecord(this.$props.customerId)
          }
        },
		created:function(){
			this.orderRecord(this.$props.customerId)
		},
		methods:{
			//       
            orderRecord(customerId){
                let list = {
                        'customer_id':customerId,
                        'page':1,
                        'page_size': 10
                    }
                let qs = require('querystring')
                remindApi.orderRecord(qs.stringify(list)).then((res) => {
                    if(res.data.errno === 0){
                        console.log(res.data.data)
                        this.$data.orderRecords = res.data.data;
                    }else{

                    }
                })
            },
		}
	}
</script>
<style lang="scss" scoped>
	.order-record-box{
		.top-box{
			padding:20px 0;
		}
		.store-record-list{
			.store-record-item{
				float:left;
				margin-bottom:10px;
				padding:5px;
				width:47%;
				border:1px solid #d2d2d2;
				div{
					margin-bottom:5px;
				}
			}
			.store-record-item:nth-child(2n){
				float:right;
			}
			.store-record-item:hover{
				border:1px solid #409EFF;
			}
		}
	}
</style> 