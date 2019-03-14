import Vue from 'vue'
import Router from 'vue-router'

// 模板框架
// import Main from '../views/menu/Main'
const Main = resolve => require(['@/views/menu/Main'],resolve)

// 登录页面
// import Login from '../views/login/Login'
const Login = resolve => require(['@/views/login/Login'],resolve)

//微信设置
// import menuSetting from '../views/werMenuSetting/menuSetting'
const menuSetting = resolve => require(['@/views/werMenuSetting/menuSetting'],resolve)
//微信设置/树状图菜单
// import treeMap from '../views/werMenuSetting/treeMap'
const treeMap = resolve => require(['@/views/werMenuSetting/treeMap'],resolve)
//微信设置/图文消息设置
// import imageTextNews from '../views/werMenuSetting/imageTextNews'
const imageTextNews = resolve => require(['@/views/werMenuSetting/imageTextNews'],resolve)
//会员列表
// import memberList from '../views/memberList/memberList'
const memberList = resolve => require(['@/views/memberList/memberList'],resolve)
//会员列表/会员信息
// import memberDetail from '../views/memberList/memberDetail'
const memberDetail = resolve => require(['@/views/memberList/memberDetail'],resolve)
//会员等级
// import memberGard from '../views/memberGrade/memberGrade'
const memberGard = resolve => require(['@/views/memberGrade/memberGrade'],resolve)
//会员等级/会员权益
// import memberInterests from '../views/memberGrade/memberInterests'
const memberInterests = resolve => require(['@/views/memberGrade/memberInterests'],resolve)
//优惠券列表
// import discountList from '../views/discountList/discountList'
const discountList = resolve => require(['@/views/discountList/discountList'],resolve)
//优惠券详情
// import discountDetails from '../views/discountList/discountDetails'
const discountDetails = resolve => require(['@/views/discountList/discountDetails'],resolve)
//积分规则
const integrationRule = resolve => require(['@/views/integrationRule/integrationRule'],resolve)
//订单列表
const orderFormList = resolve => require(['@/views/orderForm/orderFormList'],resolve)
//录单页面
const placeOrder = resolve => require(['@/views/orderForm/placeOrder'],resolve)
//测试动态效果页面
const tweenTest = resolve => require(['@/views/tweenTest/tweenTest'],resolve)
//测试滑块
const windows = resolve => require(['@/views/tweenTest/windows'],resolve)

Vue.use(Router)

const router = new Router({
  mode:'hash',
  routes: [
    { path: '/login',name: 'Login',component: Login},
    {
      path: '/',
      meta: { requiresAuth: true },
      component: Main,
      children: [
        {path: '/',name: 'menuSetting',component: menuSetting},
        {path: 'treeMap/:id',name: 'treeMap',component: treeMap},
        {path: 'imageTextNews',name: 'imageTextNews',component: imageTextNews},
        {path: 'memberList', name:'memberList', component:memberList},
        {path: 'memberDetail', name:'memberDetail', component:memberDetail},
        {path:'memberGard',name:'memberGard', component:memberGard},
        {path:'memberInterests', name:'memberInterests', component:memberInterests},
        {path:'discountList', name:'discountList', component:discountList},
        {path:'discountDetails/:id', name:'discountDetails',component:discountDetails},
        {path:'integrationRule', name:'integrationRule', component:integrationRule},
        {path:'orderFormList', name:'orderFormList', component:orderFormList},
        {path:'placeOrder', name:'placeOrder', component:placeOrder},
        {path:'tweenTest', name:'tweenTest', component:tweenTest},
        {path:'windows', name:'windows', component:windows},
      ]
  }]
})

router.beforeEach((to, from, next) => {
  let username = window.localStorage.getItem('username')
  if (to.matched.some(
        record => record.meta.requiresAuth)&& (!username || username === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
