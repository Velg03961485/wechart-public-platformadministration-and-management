<template>
	<div class="store-record-box">
		<h3 class="top-box">到店总次数：{{storeRecords.count_num}}次</h3>
		<ul class="store-record-list">
			<li class="store-record-item" v-for="(item,key) in storeRecords.list">
				<div class="item-cont">
					<div class="left-img">
						<img :src="storeRecords.list[key].avatar">
					</div>
					<ul class="right-txt">
						<li class="item-time">时间：{{storeRecords.list[key].created_at | date(4)}}</li>
						<li class="store-info">门店：{{storeRecords.list[key].store_name}}</li>
						<li class="store-info">设备：{{storeRecords.list[key].device_name}}</li>
					</ul>
				</div>
			</li>
		</ul>
		<!-- 分页 -->
		<div>
			<el-pagination 
				background
	            class="pagination" 
	            layout="prev, pager, next" 
	            small 
	            @current-change="changePage" 
	            :current-page="userInfoPagination.currentPage" 
	            :page-size="requestParas.page_size"
	            :total="userInfoPagination.totalCount">
	        </el-pagination>
	    </div>
	</div>
</template>
<script>
	import remindApi from '../api/remind'
	export default{
		name:'store-record',
		props:{
            customerId:{
                type:Number
            }
        },
		data(){
			return{
				storeRecords:{},
				userInfoPagination:{
		        	currentPage:1,
		        	totalCount:0,
		        },
				requestParas: {
					customer_id:'',
	                page: 1,
	                page_size:6
				}
			}
		},
		watch:{
          customerId: function() {
             this.storeRecord(this.$props.customerId)
          }
        },
		created:function(){
			this.storeRecord(this.$props.customerId)
		},
		methods:{
			storeRecord(customerId){
				this.$data.requestParas.customer_id = customerId;
                let qs = require('querystring')
                remindApi.storeRecord(qs.stringify(this.$data.requestParas)).then((res) => {
                	console.log(res)
                    if(res.data.errno === 0){
                        console.log(res.data.data)
                        this.$data.storeRecords = res.data.data;
                        this.$data.userInfoPagination.currentPage = res.data.data.pagination.currentPage;
		        		this.$data.userInfoPagination.totalCount = res.data.data.pagination.totalCount;
                    }else{

                    }
                })
            },
            changePage(currentPage){
            	this.$data.requestParas.page = currentPage;
            	this.storeRecord(this.$props.customerId)
            }
			
		}
	}
</script>
<style lang="scss" scoped>
	.store-record-box{
		.top-box{
			padding:20px 0;
		}
		.store-record-list{
			overflow:hidden;
			.store-record-item{
				float:left;
				margin-bottom:10px;
				padding:5px;
				width:47%;
				border:1px solid #d2d2d2;
				.item-cont{
					overflow:hidden;
					.left-img{
						float:left;
						margin-right:10px;
						width: 80px;
						height: 80px;
						background:#ccc;
						overflow: hidden;
						img{
							width: 100%;
						}
					}
					.right-txt{
						float: left;
						line-height:26px;
					}
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
	.el-pagination{
		margin:10px;
	  	float: right;
	}
</style> 