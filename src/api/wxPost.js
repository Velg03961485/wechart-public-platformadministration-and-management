import axios from 'axios'
import JavaApi from '../config/javaAPI'    //请求java接口



export default {
  WXUseList (list) {         //微信公众号列表
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.USELIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  WXPostList () {        //调用鹰眼门店组织架构列表
    return new Promise((resolve, reject) => {
      axios.post(global.WXGETPOSY).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  AddNewWX (list) {        //新增一个公众号
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.ADDWXId,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkOnlyOne (list) {        //查询单个
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKONLY,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  ChangeOldWX (list) {        //修改公众号
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHANGWXOLD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deletThisWXOnly (list) {        //删除公众号
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETWX,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
//  微信菜单设置
  getWXMenuList (list) {        //获取所有的菜单信息
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.GETALLMENULIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkOneMenuBy (list) {        //查询一个菜单
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKONEMENU,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  saveNewOrOldMenu (list) {        //查询一个菜单
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.SAVEMENUONLY,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deletOnlyWXMenu (list) {        //删除一个菜单
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETONENEMU,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  postInfoToWX (list) {        //同步微信菜单
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CREATEMENUALL,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  sortMenuWXPost (list) {        //微信菜单排序
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.SAVEMENUSORT,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkOutInfoTextWord (list) {        //微信菜单排序
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKTEXTWORD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
//  图文消息管理
  getAllTextWordList (list) {        //获取所有图文
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.WXTEXTLIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addNewTextWord (list) {        //新增
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.SAVETEXTWORD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkOutThisOnes (list) {        //查询单个图文
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.OENTEXTWORDBYONE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deletThisOneTextWord (list) {        //删除单个图文
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETTHIDTEXTBYONE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  changeOldForTextWord (list) {        //删除单个图文
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHANGETHISOENWORD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
}
