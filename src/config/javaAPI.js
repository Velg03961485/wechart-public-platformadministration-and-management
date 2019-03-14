
// const javaApiUrl  = 'http://47.92.171.71:8080'    //开发
const javaApiUrl  = 'http://crm.ibetwo.com:8080'     //测试

const LOGINFORM = javaApiUrl + '/login'     //登录

const USELIST = javaApiUrl + '/wechat/getWechatList'     //公众号列表
const ADDWXId = javaApiUrl + '/wechat/saveWechatInfo'     //新增公众号
const CHECKONLY = javaApiUrl + '/wechat/getWechatInfoById'    //查询单个信息
const CHANGWXOLD = javaApiUrl + '/wechat/updateWechatInfo'    //修改公众号
const DELETWX = javaApiUrl + '/wechat/deleteWechatInfoById'    //删除公众号

//公众号菜单
const GETALLMENULIST = javaApiUrl + '/wechat/getTotalWechatMenu'    //获取所有的菜单信息
const SAVEMENUONLY = javaApiUrl + '/wechat/saveMenu'    //保存新增的一个菜单
const CREATEMENUALL = javaApiUrl + '/wechat/createMenu'    //同步菜单
const CHECKONEMENU = javaApiUrl + '/wechat/getWechatMenuById'    //查询单个菜单
const CHANGEMENUBYONE = javaApiUrl + '/wechat/updateMenu'    //修改菜单
const DELETONENEMU = javaApiUrl + '/wechat/deleteMenu'    //删除菜单菜单
const SAVEMENUSORT = javaApiUrl + '/wechat/saveMenuOrder'    //保存更改的菜单排序
const CHECKTEXTWORD = javaApiUrl + '/wechat/getMessageList'    //搜索图文

//微信图文
const WXTEXTLIST = javaApiUrl + '/wechatMessage/getWechatMessageList'    //搜索图文
const OENTEXTWORDBYONE = javaApiUrl + '/zjkj/wechatMessage/getWechatMessageById'    //单个查询
const SAVETEXTWORD = javaApiUrl + '/zjkj/wechatMessage/saveWechatMessage'    //保存单个图文
const CHANGETHISOENWORD = javaApiUrl + '/zjkj/wechatMessage/updateWechatMessage'    //修改保存单个图文
const DELETTHIDTEXTBYONE = javaApiUrl + '/zjkj/wechatMessage/deleteWechatMessageById'   //删除单个图文
const UPLOGINIAMGE = javaApiUrl + '/zjkj/wechatMessage/uploadImage'      //上传图片接口

//会员等级
const MENBERBACKLIST = javaApiUrl + '/crm/memberGrade/list'     //会员等级列表接口
const MEMBERADD = javaApiUrl + '/crm/memberGrade/save'    // 新增会员等级
const CHECKGRADEONE = javaApiUrl + '/crm/memberGrade/getById'    //查询单个
const SURECHANGEFORGRADE = javaApiUrl + '/crm/memberGrade/update'   //确认修改
const DELETTHISFORGRADE = javaApiUrl + '/crm/memberGrade/remove'    //删除一条

//会员权益
const MEMBERINSTERLIST = javaApiUrl + '/crm/memberGradeRights/list'    //会员权益的列表
const MEMBERINSTERADDNEW = javaApiUrl + '/crm/memberGradeRights/save'    //新增一条会员权益
const CHECKONEFORMEMBERINSTER = javaApiUrl + '/crm/memberGradeRights/getById'   //查询一条会员权益
const SURECHANGEMEMBERINSTER = javaApiUrl + '/crm/memberGradeRights/update'   //确认修改一条会员权益
const DELETETHISONEMEMBERINSTER = javaApiUrl + '/crm/memberGradeRights/remove'  //删除一条会员权益
const IMAGEFORINTERESTALL = javaApiUrl + '/crm/images/list'      //会员权益图标

//积分规则
const INTERGRALALLLIST = javaApiUrl + '/crm/integral/list'    //积分规则列表
const ADDNEWINTEGRALFORONR = javaApiUrl + '/crm/integral/save'    //新增一条积分规则
const CHECKONEFORINTEGRALINFO = javaApiUrl + '/crm/integral/getById'   //查询一条积分规则
const DELETEINTEGRALFORONR = javaApiUrl + '/crm/integral/remove'   //删除一条积分规则
const SAVEONEOLDINTEGRALFOR = javaApiUrl + '/crm/integral/update'   //确认修改一条积分规则

//优惠券
const CRADFORALLLIST = javaApiUrl + '/crm/coupon/list'  //优惠券列表
const ADDNEWCARDFORONE = javaApiUrl + '/crm/coupon/save' //新增一张优惠券
const DELETETHISCARSFORONE = javaApiUrl + '/crm/coupon/remove'  //删除一张卡券
const CHECKOUTTHISCARD = javaApiUrl + '/crm/coupon/getById' //查询一张卡券
const CHANGEOLDCARD = javaApiUrl + '/crm/coupon/update'  //确认修改一张卡券

export default {
  LOGINFORM,
  USELIST,
  ADDWXId,
  CHECKONLY,
  CHANGWXOLD,
  DELETWX,
  GETALLMENULIST,
  SAVEMENUONLY,
  CREATEMENUALL,
  CHECKONEMENU,
  CHANGEMENUBYONE,
  DELETONENEMU,
  SAVEMENUSORT,
  CHECKTEXTWORD,
  WXTEXTLIST,
  OENTEXTWORDBYONE,
  SAVETEXTWORD,
  CHANGETHISOENWORD,
  DELETTHIDTEXTBYONE,
  UPLOGINIAMGE,
  MENBERBACKLIST,
  MEMBERADD,
  CHECKGRADEONE,
  SURECHANGEFORGRADE,
  DELETTHISFORGRADE,
  MEMBERINSTERLIST,
  MEMBERINSTERADDNEW,
  CHECKONEFORMEMBERINSTER,
  SURECHANGEMEMBERINSTER,
  DELETETHISONEMEMBERINSTER,
  IMAGEFORINTERESTALL,
  INTERGRALALLLIST,
  ADDNEWINTEGRALFORONR,
  CHECKONEFORINTEGRALINFO,
  DELETEINTEGRALFORONR,
  SAVEONEOLDINTEGRALFOR,
  CRADFORALLLIST,
  ADDNEWCARDFORONE,
  DELETETHISCARSFORONE,
  CHECKOUTTHISCARD,
  CHANGEOLDCARD,
}
