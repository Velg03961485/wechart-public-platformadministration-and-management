import axios from 'axios'
import JavaApi from '../config/javaAPI'    //请求java接口

export default {
  memberGradeList(list) {         //会员等级的列表
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.MENBERBACKLIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addNewMemberGrade(list) {         //新增会员等级
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.MEMBERADD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  chexkThisGradeOne(list) {         //查询单个会员等级
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKGRADEONE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  upDateThisOneForGrade(list) {         //确认保存修改
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.SURECHANGEFORGRADE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteTisGradeFor(list) {         //确认保存修改
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETTHISFORGRADE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkInsterList(list) {         //会员权益列表
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.MEMBERINSTERLIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkOneThisInster(list) {         //查看单个会员权益
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKONEFORMEMBERINSTER,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addNewInsterForOne(list) {         //增加一个新的会员权益
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.MEMBERINSTERADDNEW,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  changeThisOneInster(list) {         //更改一条会员权益
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.SURECHANGEMEMBERINSTER,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteThisInsterForOne(list) {         //更改一条会员权益
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETETHISONEMEMBERINSTER,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getImagePointForInster(list) {         //会员权益图标
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.IMAGEFORINTERESTALL,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
}
