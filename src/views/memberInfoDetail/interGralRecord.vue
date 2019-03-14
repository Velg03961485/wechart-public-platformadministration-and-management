<template>
    <div class="guest-list-page">
      <template style="">
        <el-table
          :data="interGralTableData"
          style="width: 100%;text-align:center;margin-left: 0rem;margin-top: 2rem">
          <el-table-column
            prop="type"
            label="类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容">
          </el-table-column>
          <el-table-column
            prop="number"
            label="分值">
          </el-table-column>
          <el-table-column
            prop="money"
            label="结余">
          </el-table-column>
        </el-table>
      </template>
    </div>
</template>

<script>
    export default {
        name: "inter-gral-record",
      data(){
        return{
          interGralTableData: [{
            type:'收入',
            time:'2018-12-23',
            content: '消费收入',
            number: '+11分',
            money:'11分',
          },{
            type:'支出',
            time:'2018-12-30',
            content: '积分过期',
            number: '-100分',
            money:'0分',
          }]
        }
      },
    }
</script>

<style scoped>

</style>
