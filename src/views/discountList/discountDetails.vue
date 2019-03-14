<template>
    <div class="guest-list-page">
      <!--详情查看-->
      <el-form :model='formCard' ref="formCard"  label-width="150px" class="demo-ruleForm">
        <el-form-item label="优惠券类型:">
          <div class="itemViewStyle">直减券</div>
        </el-form-item>
        <el-form-item label="优惠券名称:">
          <div class="itemViewStyle">新会员注册券</div>
        </el-form-item>
        <el-form-item label="优惠券金额:">
          <div class="itemViewStyle">20元，无门槛使用</div>
        </el-form-item>
        <el-form-item label="发放时间:">
          <div class="itemViewStyle">2018.12.13-2018.12.30</div>
        </el-form-item>
        <el-form-item label="使用时间:">
          <div class="itemViewStyle">2018.12.13-2018.12.30</div>
        </el-form-item>
        <el-form-item label="适用品类:">
          <div class="itemViewStyle">通用</div>
        </el-form-item>
        <el-form-item label="适用店铺:">
          <div class="itemViewStyle">所有</div>
        </el-form-item>
        <el-form-item label="发放对象:">
          <div class="itemViewStyle">新用户</div>
        </el-form-item>
        <el-form-item label="其他限制:">
          <div class="itemViewStyle">不可叠加</div>
        </el-form-item>
        <el-form-item label="优惠券使用率:">

        </el-form-item>
        <div class="getNumberCardStyle">
          <el-form-item label="领取数:">

          </el-form-item>
          <el-form-item label="领取数:">

          </el-form-item>
        </div>
        <div class="getNumberCardStyle">
          <el-form-item label="会员来源分布:">

          </el-form-item>
          <el-form-item label="使用门店分布:">

          </el-form-item>
        </div>
        <div class="choseAfterShowStyle">

        </div>
        <div class="chartBorderShowStyle">
          <vue-highcharts :options="options" ref="lineCharts" class="chartStyle"></vue-highcharts>

          <vue-highcharts :options="options" ref="PartCharts" class="chartStyle"></vue-highcharts>

          <vue-highcharts :options="options" ref="otherCharts" class="chartStyle"></vue-highcharts>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 2rem;">
        <el-button @click="checkOutcancel()" style="float: right;margin-right: 3rem;margin-bottom: 3rem">返回</el-button>
        <el-button type="primary" @click="checkOutForm()" style="float: right;margin-right: 5rem;margin-bottom: 3rem">确 定</el-button>
      </div>
    </div>
</template>

<script>
  import VueHighcharts from 'vue2-highcharts'
  import cardsApi from '@/api/cards'
  const asyncData = {
    name: '会员',
    data: [{name:'杭州市',y:60},{name:'上海市',y:10},{name:'湖州市',y:30}]
  }
    export default {
        name: "discount-details",
      components: {
        VueHighcharts
      },
      data(){
          return{
            formCard:{},
            //  图表
            options: {
              chart: {
                type: 'pie',
                height:'200',
                width:'400'
              },
              title: {
                text: ''
              },
              subtitle: {
                text: ''
              },
              tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'    //悬浮提示
              },
              credits: {
                enabled: false    //去除官网的链接
              },
              colors: [
                '#7CB5EC',
                '#FFC200',
                '#F15780',
                '#8085E9',
                '#90ED7D',
                '#909399'
              ],
              plotOptions: {
                pie: {
                  // innerSize: 70, //环状图中间圆环的大小
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  },
                }
              },
              series: []
            },
          }
      },
      created: function() {
        // lineCharts.setOptions({
        //   lang: {
        //     thousandsSep: ',',
        //     noData: '暂无数据'
        //   }
        // });
        let cardDetailsId = this.$route.params.id;
        console.log(cardDetailsId)
        this.getInfoForOne(cardDetailsId)
        setTimeout(() => {
          this.load();
          this.departAll();
          this.departOther();
        }, 2000)
      },
      methods:{
        getInfoForOne(val){
          let list = {
            id:val
          }
          let qs = require('querystring')
          cardsApi.checkoutThisCardForOne(qs.stringify(list)).then((response) => {
            console.log(response.data.data);


          })
        },
        load(){
          let lineCharts = this.$refs.lineCharts;
          lineCharts.delegateMethod('showLoading', 'Loading...');
          setTimeout(() => {
            lineCharts.addSeries(asyncData);
            lineCharts.hideLoading();
          }, 1000)
        },
        departAll(){
          let PartCharts = this.$refs.PartCharts;
          PartCharts.delegateMethod('showLoading', 'Loading...');
          setTimeout(() => {
            PartCharts.addSeries(asyncData);
            PartCharts.hideLoading();
          }, 1000)
        },
        departOther(){
          let otherCharts = this.$refs.otherCharts;
          otherCharts.delegateMethod('showLoading', 'Loading...');
          setTimeout(() => {
            otherCharts.addSeries(asyncData);
            otherCharts.hideLoading();
          }, 1000)
        },
      //  返回
        checkOutcancel(){
          this.$router.push({
            path: 'discountList'
          })
        },
      //  确认
        checkOutForm(){
          this.$router.push({
            path: 'discountList'
          })
        },
      }
    }
</script>

<style scoped>
  .itemViewStyle{
    /*border:1px solid red;*/
    width: 23rem;
    margin-left: 0;
  }
  .getNumberCardStyle{
    display: flex;
    flex-direction: row;
  }
  .choseAfterShowStyle{
    /*border:1px solid hotpink;*/
    height: 4rem;
  }
  .chartBorderShowStyle{
    /*border:1px solid salmon;*/
    display: flex;
    flex-direction: row;
  }
</style>
