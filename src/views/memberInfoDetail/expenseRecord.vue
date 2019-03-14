<template>
    <div class="guest-list-page">
      <template style="">
        <el-table
          :data="ExpenseTableData"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            prop="goodsNumber"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名">
          </el-table-column>
          <el-table-column
            prop="piece"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="money"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="depart"
            label="购买门店">
          </el-table-column>
          <el-table-column
            prop="guide"
            label="导购">
          </el-table-column>
        </el-table>
      </template>
    </div>
</template>

<script>
    export default {
        name: "expense-record",
      data(){
          return{
            ExpenseTableData: [{
              goodsNumber:'FE121853214',
              time:'2018-12-23',
              goodsName: '黄金大手镯',
              piece: 2,
              money:12000,
              depart:'关凤店',
              guide:'明玉'
            }]
          }
      },
    }
</script>

<style scoped>

</style>
