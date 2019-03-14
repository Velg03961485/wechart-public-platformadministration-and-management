<template>
  <div class="guest-list-page">
    <div class="movebox" ref="likeThisStyle">
      <div class="movego"></div>
      <div class="txt" id="txt">拖动滑块验证</div>
      <div class="move moveBefore" v-move="{set:set}"></div>
    </div>
    <!--<div class="movebox" >-->
    <!--<div class="movego"></div>-->
    <!--<div class="txt" id="txt">拖动滑块验证</div>-->
    <!--<div class="move moveBefore" v-move></div>-->
    <!--</div>-->
    <el-button @click="clickThis" :disabled="canlick">点击进入</el-button>
  </div>

</template>

<script>
    export default {
        name: "windows",
      data(){
          return{
            canlick:true,
          }
      },
      methods:{
        clickThis(){
          console.log('进入')
          console.log(this.$refs.likeThisStyle)
        },
        set(val){
          console.log(val)
          this.$data.canlick = val;
          console.log(this.$data.canlick)
        },
      },
      directives: {
        move(el,binding) {
          el.onmousedown = function(e) {
            var X = e.clientX - el.offsetLeft
            document.onmousemove = function(e) {
              var endx = e.clientX - X
              el.className = 'move moveBefore'
              el.style.left = endx + 'px'
              // console.log(el.parentNode.children[0])
              // console.log(el.parentNode.style.width)
              var width = $('.movebox').width() - $('.move').width()
              el.parentNode.children[0].style.width = endx + 'px'
              el.parentNode.children[1].innerHTML = '拖动滑块验证'
              //临界值小于
              if (endx <= 0) {
                el.style.left = 0 + 'px'
                el.parentNode.children[0].style.width = 0 + 'px'
                // $('.movego').width(0)
              }
              //临界值大于
              // console.log(el.style.left)
              if (parseInt(el.style.left) >= width) {
                el.style.left = width + 'px';
                el.parentNode.children[0].style.width = width + 'px';
                el.parentNode.children[1].innerHTML = '验证通过';
                el.className = 'move moveSuccess';
                el.onmousedown = null;
                // console.log('看我干什么')
                binding.value.set(false)
              }
            }
          }
          document.onmouseup = function() {
            document.onmousemove = null
            // console.log('这的作用')
            // console.log(this.$data.canlick)
          }
        }
      }
    }
</script>

<style lang="scss" scoped src="@/assets/css/tweenTest/windows.scss"></style>
