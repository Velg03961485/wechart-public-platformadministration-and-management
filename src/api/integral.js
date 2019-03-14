import axios from 'axios'
import JavaApi from '../config/javaAPI'    //请求java接口

export default {
  integrationListForm (list) {         //积分规则列表
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.INTERGRALALLLIST,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  addnewCIntegrationFor (list) {         //新增一条积分规则
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.ADDNEWINTEGRALFORONR,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteThisIntegrationFor (list) {         //删除一条积分规则
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.DELETEINTEGRALFORONR,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  checkoutThisIntegrationForOne (list) {         //查询一条积分规则
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.CHECKONEFORINTEGRALINFO,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  sureSaveOldIntegration (list) {         //确认修改一条积分规则
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.SAVEONEOLDINTEGRALFOR,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
}
