<template>
    <div class="guest-list-page">
      <template style="">
        <el-table
          :data="maintenanceTableData"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            prop="time"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNumber"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goodBarcode"
            label="商品条形码">
          </el-table-column>
          <el-table-column
            prop="maintainCause"
            label="维修原因">
          </el-table-column>
          <el-table-column
            prop="getDepart"
            label="接收门店">
          </el-table-column>
          <el-table-column
            prop="getTime"
            label="接收时间">
          </el-table-column>
          <el-table-column
            prop="postTime"
            label="返还时间">
          </el-table-column>
          <el-table-column
            prop="maintainResult"
            label="维修结果">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      </template>
    </div>
</template>

<script>
    export default {
        name: "maintenance-record",
      data(){
          return{
            maintenanceTableData: [{
              time:'2018-11-27',
              orderNumber:'03156211652',
              goodBarcode:'082170962356',
              maintainCause: '氧化',
              getDepart:'关凤店',
              getTime: '2018-11-27',
              postTime:'2019-1-28',
              maintainResult:'完成',
              remark:'不是本店商品'
            }]
          }
      },
    }
</script>

<style scoped>

</style>
