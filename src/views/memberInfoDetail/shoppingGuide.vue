<template>
    <div class="guest-list-page">
      <template style="">
        <el-table
          :data="shoppingTableData"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            prop="getTime"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="departName"
            label="门店">
          </el-table-column>
          <el-table-column
            prop="shoppingIsTrue"
            label="是否成交"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goodsLabel"
            label="看货标签">
          </el-table-column>
          <el-table-column
            prop="marking"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="followUp"
            label="跟进人员">
          </el-table-column>

        </el-table>
      </template>
    </div>
</template>

<script>
    export default {
        name: "shopping-guide",
      data(){
          return{
            shoppingTableData: [{
              getTime: '2018-11-27',
              departName:'关凤店',
              shoppingIsTrue:'是',
              goodsLabel:'黄金，古风',
              marking:'潜力顾客，每月有望进行大量消费',
              followUp:'童童'
            }]
          }
      },
    }
</script>

<style scoped>

</style>
