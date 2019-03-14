<!--定义全局变量-->

<template>

</template>

<script>
    // export default {
    //     name: "global"
    // }
//  定义左侧菜单栏是否显示的全局变量
  const leftMenuShow1 = true;
  const leftMenuShow2 = false;

  //抛出
  export default {
    leftMenuShow1,
    leftMenuShow2,
    setLeftMenuShow1(newLeftMenuShow1){
      this.leftMenuShow1 = newLeftMenuShow1
    },
    setLeftMenuShow2(newLeftMenuShow2){
      this.leftMenuShow2 = newLeftMenuShow2
    },
  }
</script>

<style scoped>

</style>
<!--this.GLOBAL.setLeftMenuShow1(false)   //调用的全局函数,把状态换为false，防止刷新的时候状态有误  ,这个方法不能在刷新的时候保存值，放弃-->
