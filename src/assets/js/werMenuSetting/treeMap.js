import WXApi from '@/api/wxPost'
import getBytesLength from "../../../global/getBytesLength";
export default {
  name: "tree-map",
  data () {
    return {
      originalId: '',
      weixinName:'湖州金店服务中心',
      FormVisible:false,
      activeName2: 'first',
      dialogTitle:'',
      changeFormrules:{
        name:[
          {required: true, message: '请输入菜单名称', trigger: 'blur'},
          { min: 1, max: 4, message: '字数不超过4个汉字或8个字母', trigger: 'blur' }
        ]
      },
      menuList:[],
      listData1:[],
      listData2:[],
      listData3:[],
      canCreateChild1:false,
      canCreateChild2:false,
      canCreateChild3:false,
      data1ChildrenLength:0,
      data2ChildrenLength:0,
      data3ChildrenLength:0,
      parent:0,       //创建菜单的父级
      postType:'view',      //选择回复的类型
      needDeletId:'',      //删除或修改公众号id传值
      addOrChangeOld:false,      //添加还是删除判断   true  为添加新的，false 为更改旧的
      needSortMenu:false,      //显示排序的输入框
      getSortNumber:0,
      menuSortData:[],
    //  菜单名称
      menuName_first:'菜单一',
      menuName_second:'菜单二',
      menuName_third:'菜单三',
      menuNameForOne:'',
      menuNameForTow:'菜单名称',
      deleteMenuNameFor:'一级菜单',
    //  一级菜单修改名称
      changeForm:{
        name:'',
        url:''
      },
      changeInputOne:false,
      changeInputTwo:true,
      colorLink:'fontBlue',
      colorPass:'fontGray',
      changeOneMenu:false,    //  当一级有二级菜单且对一级菜单进行修改的时候，显示
      addOrChangeOneAndTwo:false,    //当创建一级或者二级，或修改二级的时候,或者一级没有子级的时候,显示
      changeMenu:false,
      btnMenuFirst:true,    //下面的按钮展示
      btnMenuSecond:false,
      btnMenuThird:true,
      cheOutBack:false,
      checked:false,
      radio2:'',
      checkInText:'',
      restaurants: [],
      postWXTextId:'',   //发送图文id
      dialogVisible:false,    //确认删除弹框
      isCanShowContentForChildren:false,     //当没有二级菜单的时候，弹框不显示
    }
  },
  created:function () {
    // 取到路由带过来的参数
    let originalId = this.$route.params.id;
    console.log(originalId);
    if(this.$route.params.id == undefined || this.$route.params.id == null || this.$route.params.id == ''){
      console.log(sessionStorage.getItem('onlyWXId'))
      this.$data.originalId = sessionStorage.getItem('onlyWXId');
    }else{
      this.$data.originalId = originalId;
    }
    this.getMenuList()
  },
  mounted:function () {


  },
  methods: {
    getMenuList(){
      console.log(this.$data.originalId)
      let list = {
        originalId:this.$data.originalId
      };
      let qs = require('querystring')
      WXApi.getWXMenuList(qs.stringify(list)).then((response) => {
        // console.log(response.data.data.children);
        this.$data.menuList = response.data.data.children;
        this.$data.weixinName = response.data.data.wechatName;
        console.log(this.$data.menuList[0].children.length)
        this.$data.data1ChildrenLength = this.$data.menuList[0].children.length;
        this.$data.data2ChildrenLength = this.$data.menuList[1].children.length;
        this.$data.data3ChildrenLength = this.$data.menuList[2].children.length;
        if(this.$data.menuList.length === 1){
          this.$data.listData1 = this.$data.menuList[0].children;
          this.$data.listData2 = [];
          this.$data.listData3 = [];
          // if(this.$data.menuList[0].canCreateChild === true){
          //   this.$data.canCreateChild1 = true
          // }else{
          //   this.$data.canCreateChild1 = false
          // }
        }else if(this.$data.menuList.length === 2){
          this.$data.listData1 = this.$data.menuList[0].children;
          this.$data.listData2 = this.$data.menuList[1].children;
          this.$data.listData3 = [];
          // if(this.$data.menuList[0].canCreateChild === true){
          //   this.$data.canCreateChild1 = true
          // }else{
          //   this.$data.canCreateChild1 = false
          // }
          // if(this.$data.menuList[1].canCreateChild === true){
          //   this.$data.canCreateChild2 = true
          // }else{
          //   this.$data.canCreateChild2 = false
          // }
        }else if(this.$data.menuList.length === 3){
          console.log(3)
          // console.log()
          this.$data.listData1 = this.$data.menuList[0].children;
          this.$data.listData2 = this.$data.menuList[1].children;
          this.$data.listData3 = this.$data.menuList[2].children;
          // if(this.$data.menuList[0].canCreateChild === true){
          //   this.$data.canCreateChild1 = true
          // }else{
          //   this.$data.canCreateChild1 = false
          // }
          // if(this.$data.menuList[1].canCreateChild === true){
          //   this.$data.canCreateChild2 = true
          // }else{
          //   this.$data.canCreateChild2 = false
          // }
          // if(this.$data.menuList[2].canCreateChild === true){
          //   this.$data.canCreateChild3 = true
          // }else{
          //   this.$data.canCreateChild3 = false
          // }
        }else{
          this.$data.listData1 = [];
          this.$data.listData2 = [];
          this.$data.listData2 = [];
        }



      })
    },
    back(){
      sessionStorage.setItem('setLeftMenuShow1', true)    //保存值，防止刷新的时候页面错误
      sessionStorage.setItem('setLeftMenuShow2', false)
      sessionStorage.setItem('onlyWXId', '')      //返回的时候，把onlyWXId置为空，防止下次赋值失败
      //向Main组件传值
      this.$emit('listenThis',true)
      this.$router.push({
        path: '/'
      })
    },
  //  点击第一个菜单
    menuFirstBtn(val){
      console.log('第一个事件');
      console.log(val)
      this.$data.changeForm.name = '';
      this.$data.changeForm.url = '';
      this.$data.cheOutBack = false;
      this.$data.checkInText = '';
      this.$data.postWXTextId = '';
      this.$data.changeInputOne = false;
      this.$data.changeInputTwo = true;
      this.$data.colorLink = 'fontBlue';
      this.$data.colorPass = 'fontGray';
      this.$data.postType = 'view';
      this.$data.parent = 0;       //一级菜单不管是创建还是修改，父级都为0
      if(val.id === undefined || val.id === '' || val.id === null){
        this.$data.changeOneMenu = false;
        this.$data.changeMenu = true;
        this.$data.addOrChangeOneAndTwo = true;
        this.$data.changeForm.name = '';
        this.$data.needDeletId = '';      //这是显示为新建，要是删除或者修改needDeletId 为空
        this.$data.addOrChangeOld = true;    //这是新增判断
        this.$data.deleteMenuNameFor = '一级菜单';
        this.$data.menuNameForTow = '菜单名称';
        this.$data.isCanShowContentForChildren = false;
      }else{
        this.$data.isCanShowContentForChildren = true;
        let list = {
          id:val.id
        };
        this.$data.needDeletId = val.id;    //点击一级菜单
        let qs = require('querystring')
        WXApi.checkOneMenuBy(qs.stringify(list)).then((response) => {
          console.log(response.data.data);
          this.$data.menuNameForOne = response.data.data.name;
          this.$data.deleteMenuNameFor = response.data.data.name;
          this.$data.addOrChangeOld = false;
          if(response.data.data.parent === 0){
            this.$data.changeOneMenu = true;
            this.$data.changeMenu = true;
            this.$data.addOrChangeOneAndTwo = false;
            this.$data.changeForm.name = response.data.data.name;
          }else{
            this.$data.changeOneMenu = false;
            this.$data.changeMenu = true;
            this.$data.addOrChangeOneAndTwo = true;
          }
        })
      }


    },
    //点击第二个菜单
    menuSecondBtn(command){
      console.log('第二个事件')
      console.log(command)
      //查询之前先做一个清空
      this.$data.changeForm.name = '';
      this.$data.changeForm.url = '';
      this.$data.cheOutBack = false;
      this.$data.checkInText = '';
      this.$data.postWXTextId = '';
      this.$data.changeInputOne = false;
      this.$data.changeInputTwo = true;
      this.$data.colorLink = 'fontBlue';
      this.$data.colorPass = 'fontGray';
      this.$data.postType = 'view';
      // this.$data.changeOneMenu = false;
      // this.$data.changeMenu = true;
      // this.$data.addOrChangeOneAndTwo = true;
      if(command.parent === 0){
        //二级菜单新建,得到它的父级菜单id
        this.$data.parent = command.id;      //新增得到他的父级
        this.$data.changeOneMenu = false;
        this.$data.changeMenu = true;
        this.$data.addOrChangeOneAndTwo = true;
        this.$data.addOrChangeOld = true;    //这是新增判断
        // this.$data.changeForm = {}
        this.$data.changeForm.name = '';
        this.$data.changeForm.url = '';
        this.$data.menuNameForTow = '菜单名称';
      }else {
        let list = {
          id:command
        };
        this.$data.needDeletId = command;    //点击二级菜单
        let qs = require('querystring')
        WXApi.checkOneMenuBy(qs.stringify(list)).then((response) => {
          console.log(response.data.data);
          this.$data.menuNameForTow = response.data.data.name;
          this.$data.deleteMenuNameFor = response.data.data.name;
          this.$data.changeOneMenu = false;
          this.$data.changeMenu = true;
          this.$data.addOrChangeOneAndTwo = true;
          this.$data.changeForm.name = response.data.data.name;
          this.$data.parent = response.data.data.parent;       //如果是二级菜单的话，传的是它父级的
          this.$data.addOrChangeOld = false;
          if(response.data.data.type === 'view'){
            this.$data.changeInputOne = false;
            this.$data.changeInputTwo = true;
            this.$data.colorLink = 'fontBlue';
            this.$data.colorPass = 'fontGray';
            this.$data.postType = 'view';
            this.$data.changeForm.url = response.data.data.url;
          }else if(response.data.data.type === 'click'){
            this.$data.changeInputOne = true;
            this.$data.changeInputTwo = false;
            this.$data.colorLink = 'fontGray';
            this.$data.colorPass = 'fontBlue';
            this.$data.checkInText = response.data.data.messageTitle;
            this.$data.postType = 'click';
            // this.$data.postWXTextId
          }
        })
      }
    },
    // handleCommand(command){
    //   console.log('第二个事件')
    //   console.log(command)
    //   // console.log(parentId)
    //
    //   if(command.parent === 0){
    //     //二级菜单新建,得到它的父级菜单id
    //     this.$data.parent = command.id;      //新增得到他的父级
    //     this.$data.changeOneMenu = false;
    //     this.$data.changeMenu = true;
    //     this.$data.addOrChangeOneAndTwo = true;
    //     this.$data.addOrChangeOld = true;    //这是新增判断
    //   }else {
    //     let list = {
    //       id:command
    //     };
    //     this.$data.needDeletId = command;    //点击二级菜单
    //     let qs = require('querystring')
    //     WXApi.checkOneMenuBy(qs.stringify(list)).then((response) => {
    //       console.log(response.data.data);
    //       this.$data.changeOneMenu = false;
    //       this.$data.changeMenu = true;
    //       this.$data.addOrChangeOneAndTwo = true;
    //       this.$data.changeForm.name = response.data.data.name;
    //       this.$data.parent = response.data.data.parent;       //如果是二级菜单的话，传的是它父级的
    //       this.$data.addOrChangeOld = false;
    //       if(response.data.data.type === 'view'){
    //         this.$data.changeInputOne = false;
    //         this.$data.changeInputTwo = true;
    //         this.$data.colorLink = 'fontBlue';
    //         this.$data.colorPass = 'fontGray';
    //         this.$data.changeForm.url = response.data.data.url;
    //       }else if(response.data.data.type === 'click'){
    //         this.$data.changeInputOne = true;
    //         this.$data.changeInputTwo = false;
    //         this.$data.colorLink = 'fontGray';
    //         this.$data.colorPass = 'fontBlue';
    //       }
    //     })
    //   }
    //
    // },
    //选择链接
    chooseLinkBtn(){
      this.$data.changeInputOne = false;
      this.$data.changeInputTwo = true;
      this.$data.colorLink = 'fontBlue';
      this.$data.colorPass = 'fontGray';
      this.$data.postType = 'view';
    },
    //选择图文回复
    choosePassBtn() {
      console.log(0)
      this.$data.changeInputOne = true;
      this.$data.changeInputTwo = false;
      this.$data.colorLink = 'fontGray';
      this.$data.colorPass = 'fontBlue';
      this.$data.postType = 'click';
    },
    //远程搜索
    // remoteMethod(query) {
    //   console.log('d');
    //   console.log(query)
    //   if (query !== '') {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       this.options4 = this.list.filter(item => {
    //         return item.label.toLowerCase()
    //           .indexOf(query.toLowerCase()) > -1;
    //       });
    //     }, 200);
    //   } else {
    //     this.options4 = [];
    //   }
    // },
    // querySearch(queryString, cb) {
    //   var restaurants = this.restaurants;
    //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results);
    // },
    // createFilter(queryString) {
    //   return (restaurant) => {
    //     return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },
    // handleSelect(item) {
    //   console.log(item);
    // },
    // querySearch(ev) {
    //   console.log(ev);
    //   this.$data.needCheckText = ev;
    // },
    cheInfoForText(){
      let list = {
        originalId:this.$data.originalId,
        title:this.$data.checkInText
      };
      let qs = require('querystring')
      WXApi.checkOutInfoTextWord(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.restaurants = response.data.data
        this.$data.cheOutBack = true;
      })
    },
  //  选择其中一条
    chooseThisTitle(val){
      console.log(val);
      this.$data.checked = true;
      this.$data.checkInText = val.title;
      this.$data.postWXTextId = val.id;
    },
  //  跳转添加图文
    addTextWordBtn() {
      this.$router.push({
        path: '/imageTextNews'
      })
    },
  //  保存修改的菜单
    submitForm(){
      console.log(this.$data.parent);
      console.log(this.$data.addOrChangeOld);   //新增还是修改
      console.log(this.$data.needDeletId);      //本身的id
      if(this.$data.changeForm.name === ''){
        this.$message.error('请填写菜单名称');
        return;
      }
      // console.log(this.$data.changeForm.toString().replace(/[^\x00-\xff]/g, '01').length)
      // console.log(this.methodGetByteLen(this.$data.changeForm,4))
      // console.log(this.getBytesLength(this.$data.changeForm.name));
      let list;
      if(this.$data.addOrChangeOld === true){
      //  新增
        list = {
          name:this.$data.changeForm.name,
          parent:this.$data.parent,
          type:this.$data.postType,
          originalId:this.$data.originalId,
          url:this.$data.changeForm.url,
          sequence:'',
          messageId:this.$data.postWXTextId,
        };
      }else if (this.$data.addOrChangeOld === false) {
        //修改
        list = {
          name:this.$data.changeForm.name,
          parent:this.$data.parent,
          type:this.$data.postType,
          originalId:this.$data.originalId,
          url:this.$data.changeForm.url,
          id:this.$data.needDeletId,
          sequence:'',
          messageId:this.$data.postWXTextId,
        };
      }
      console.log(list);
      let qs = require('querystring')
      WXApi.saveNewOrOldMenu(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.code === 0){
          console.log('成功')
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.$data.changeOneMenu = false;
          this.$data.changeMenu = false;
          this.$data.addOrChangeOneAndTwo = false;
          //把信息全部清掉
          this.$data.changeForm = {};
          this.$data.parent=0;       //回复默认
          this.$data.postType='view';      //回复默认
          this.$data.needDeletId='';       //回复默认
          this.$data.addOrChangeOld=false;    //回复默认
          this.$data.postWXTextId='';   //回复默认
          this.getMenuList()
        }else if(response.data.code === 1){
          console.log('失败')
          this.$message.error(response.data.message);
        }
      })
    },
  //  删除一级菜单
    deleteThisOneMenu(){
      this.$data.dialogVisible =! this.$data.dialogVisible;
    },
  //  取消删除操作
    dialogVisibleFalse(){
      this.$data.dialogVisible =! this.$data.dialogVisible;
    },
  //  确认删除
    dialogVisiblesure(){
      console.log(this.$data.needDeletId);
      if(this.$data.needDeletId === ''){
        //当删除的为新建菜单时
        this.$data.dialogVisible =! this.$data.dialogVisible;
        this.$data.changeInputOne = false;
        this.$data.changeInputTwo = false;
      }else{
        let list = {
          id:this.$data.needDeletId
        };
        let qs = require('querystring')
        WXApi.deletOnlyWXMenu(qs.stringify(list)).then((response) => {
          console.log(response.data);
          if(response.data.code === 0){
            console.log('成功')
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getMenuList()
            this.$data.changeOneMenu = false;
            this.$data.changeMenu = false;
            this.$data.addOrChangeOneAndTwo = false;
            //把信息全部清掉
            this.$data.changeForm = {};
            this.$data.parent=0;       //回复默认
            this.$data.postType='view';      //回复默认
            this.$data.needDeletId='';       //回复默认
            this.$data.addOrChangeOld=false;    //回复默认
            this.$data.dialogVisible =! this.$data.dialogVisible;
            this.$data.btnMenuFirst = true;
            this.$data.btnMenuSecond = false;
            this.$data.btnMenuThird = true;
          }else if(response.data.code === 1){
            console.log('失败')
            this.$message.error('删除失败');
          }
        })
      }

    },
  //  取消创建
    cancel(){
      this.$data.changeOneMenu = false;
      this.$data.changeMenu = false;
      this.$data.addOrChangeOneAndTwo = false;
      //把信息全部清掉
      this.$data.changeForm.name = '';
      this.$data.changeForm.url = '';
      this.$data.parent=0;       //回复默认
      this.$data.postType='view';      //回复默认
      this.$data.needDeletId='';       //回复默认
      this.$data.addOrChangeOld=false;    //回复默认
      this.$data.postWXTextId='';   //回复默认
      this.$data.needSortMenu = false;
      this.$data.btnMenuFirst = true;
      this.$data.btnMenuSecond = false;
      this.$data.btnMenuThird = true;
    },
  //  同步到微信端
    addMenuPastTo(){
      let list = {
        originalId:this.$data.originalId
      };
      let qs = require('querystring')
      WXApi.postInfoToWX(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.code === 0){
          console.log('成功')
          this.$message({
            message: '同步成功',
            type: 'success'
          });
          this.getMenuList()
          this.$data.btnMenuFirst = true;
          this.$data.btnMenuSecond = false;
          this.$data.btnMenuThird = true;
        }else if(response.data.code === 1){
          console.log('失败')
          this.$message.error(response.data.message);
        }
      })
    },
  //  排序事件
    sortInputBtn(){
      this.$data.needSortMenu = true;
      console.log(this.$data.getSortNumber);
      this.$data.btnMenuFirst = false;
      this.$data.btnMenuSecond = true;
      this.$data.btnMenuThird = false;
    },
    getInfo(e){
      console.log(e.target.value)
      console.log(e.target.id)
      for(var i=0;i<this.$data.menuSortData.length;i++){
        console.log(this.$data.menuSortData[i].key)
        if(e.target.id === this.$data.menuSortData[i].key){
          console.log('有相同值')
          this.$data.menuSortData.splice(i,1);
        }
      }
      let postData = {
        id:e.target.id,
        order:e.target.value
      }
      this.$data.menuSortData.push(postData)
      console.log(this.$data.menuSortData)

    },
  //  排序确认发送
    postSortInfoFor(){
      console.log(JSON.stringify(this.$data.menuSortData.toString()));
      this.$data.btnMenuFirst = true;
      this.$data.btnMenuSecond = false;
      this.$data.btnMenuThird = true;
      this.$data.needSortMenu = false;
      let list = {
        orders:JSON.stringify(this.$data.menuSortData)
      };
      let qs = require('querystring')
      WXApi.sortMenuWXPost(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.code === 0){
          console.log('成功')
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getMenuList()
        }else if(response.data.code === 1){
          console.log('失败')
          this.$message.error('修改失败');
        }
      })
    },

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams',
  }
}
