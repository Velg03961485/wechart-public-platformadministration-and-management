import axios from 'axios'
import JavaApi from '../config/javaAPI'    //请求java接口

export default {
  cradListForAll (list) {         //卡券列表
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CRADFORALLLIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addNewCardForOne (list) {         //新增一张卡券
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.ADDNEWCARDFORONE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkoutThisCardForOne (list) {         //查询一张卡券
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKOUTTHISCARD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  saveOneCardForThis (list) {         //保存更改的卡券
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHANGEOLDCARD,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteThisCardForOne (list) {         //删除一张卡券
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETETHISCARSFORONE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
}
