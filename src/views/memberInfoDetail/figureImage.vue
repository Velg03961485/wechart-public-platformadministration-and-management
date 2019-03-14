<template>
    <div class="guest-list-page">
      <el-row class="rowFirst">
        <el-col :span="2">
          <div class="titleFirst">到店记录</div>
        </el-col>
      </el-row>
      <el-row class="rowFirst">
        <el-col :span="16">
          <div class="firstContent">
            <div class="rowDivStyleFirst">
              <span>到店:</span>
              <span>12次</span>
            </div>
            <div class="rowDivStyleSecond">
              <span>到店间隔时长:</span>
              <span>12天20个小时</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="rowFirst">
        <el-col :span="2">
          <div class="titleFirst">消费记录</div>
        </el-col>
      </el-row>
      <el-row class="rowFirst">
        <el-col :span="16">
          <div class="firstContent">
            <div class="rowDivStyleFirst">
              <span>购买:</span>
              <span>12次</span>
            </div>
            <div class="rowDivStyleSecond">
              <span>到店时长平均:</span>
              <span>12分钟</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="rowFirst">
        <el-col :span="2">
          <div class="titleFirst">消费偏好</div>
        </el-col>
      </el-row>
      <el-row class="rowFirst">
        <el-col :span="16">
          <div class="firstContent">
            <div class="firstChart">
              <div class="titler">材质</div>
              <vue-highcharts :options="options" ref="lineCharts" class="chartStyle"></vue-highcharts>
            </div>
            <div class="firstChart">
              <div class="titler">款式</div>
              <vue-highcharts :options="options" ref="styleCharts" class="chartStyle"></vue-highcharts>
            </div>
          </div>
        </el-col>
      </el-row>

      <!--<button @click="load">load</button>-->
    </div>
</template>

<script>
  // import Highcharts from 'highcharts';
  // import HighchartsNoData from 'highcharts-no-data-to-display';
  import VueHighcharts from 'vue2-highcharts'
  // HighchartsNoData(Highcharts)
  const asyncData = {
    name: '材质',
    data: [{name:'黄金',y:20},{name:'白银',y:80}]
  };
  const styleData ={
    name:'款式',
    data:[{name:'手链',y:10},{name:'耳环',y:30},{name:'戒指',y:60}]
  };
    export default {
        name: "figure-image",
      components: {
        VueHighcharts
      },
      data() {
        return {
          options: {
            chart: {
              type: 'pie',
              height:'230',
              width:'330'
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
                innerSize: 70, //环状图中间圆环的大小
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.percentage:.1f}%',      //引线指示
                },
                showInLegend: true
              }
            },
            series: []
          }
        }
      },
      created: function() {
        // lineCharts.setOptions({
        //   lang: {
        //     thousandsSep: ',',
        //     noData: '暂无数据'
        //   }
        // });
        // this.load();
        setTimeout(() => {
          this.load();
          this.styleChart();
        }, 2000)
      },
      methods: {
        load(){
          let lineCharts = this.$refs.lineCharts;
          lineCharts.delegateMethod('showLoading', 'Loading...');
          setTimeout(() => {
            lineCharts.addSeries(asyncData);
            lineCharts.hideLoading();
          }, 1000)
        },
        styleChart(){
          let styleCharts = this.$refs.styleCharts;
          styleCharts.delegateMethod('showLoading', 'Loading...');
          setTimeout(() => {
            styleCharts.addSeries(styleData);
            styleCharts.hideLoading();
          }, 1000)
        }

      }
    }
</script>

<style scoped>
.guest-list-page{

}
.rowFirst{
  margin-top: 1.5rem;
}
.titleFirst{
  font-size: 1rem;
  margin-left: 1rem;
}
.firstContent{
  display: flex;
  flex-direction: row;
  /*border:1px solid red;*/
  margin-left: 6rem;
}
.rowDivStyleFirst{
  /*border:1px solid saddlebrown;*/
  width: 40%;
}
.rowDivStyleSecond{
  /*border:1px solid sandybrown;*/
  width: 60%;
}
.firstChart{
  display: flex;
  flex-direction: row;
  /*margin-left: 5rem;*/
}
.chartStyle{
  /*width: 10rem;*/
  /*height: 10rem;*/
  /*border:1px solid darkcyan;*/
  margin-left: 1rem;
}
.titler{
  line-height: 7rem;
  width: 2rem;
}
</style>
