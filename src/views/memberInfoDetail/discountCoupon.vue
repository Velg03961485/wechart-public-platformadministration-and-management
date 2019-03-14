<template>
    <div class="guest-list-page">
      <template style="">
        <el-table
          :data="discountTableData"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            prop="cardNumber"
            label="券号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cardName"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="getTime"
            label="领取时间">
          </el-table-column>
          <el-table-column
            prop="takeTime"
            label="使用时间">
          </el-table-column>
          <el-table-column
            prop="goodsNumber"
            label="绑定订单号">
          </el-table-column>
          <el-table-column
            prop="useDepart"
            label="使用门店">
          </el-table-column>
        </el-table>
      </template>
    </div>
</template>

<script>
    export default {
        name: "discount-coupon",
      data(){
          return{
            discountTableData: [{
              cardNumber:'03156211652',
              type:'满减券',
              cardName: '满1000减100',
              getTime: '2018-11-27',
              takeTime:'2019-1-28',
              goodsNumber:'DE12385131',
              useDepart:'关凤店',
            }]
          }
      },
    }
</script>

<style scoped>

</style>
