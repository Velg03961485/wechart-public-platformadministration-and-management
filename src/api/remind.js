/**
 * 提醒列表 
 */
import axios from 'axios'

export default {
	
	remindList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_REMIND_LIST, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  personalInfo(customer_id){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_PERSONAL_INFO, customer_id).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  editPersonalInfo(list){
    return new Promise((resolve, reject) => {
      axios.post(global.EDIT_PERSONAL_INFO, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },


  storeRecord(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_STORE_RECORE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  orderRecord(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_ORDER_RECORE, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  getLevels(){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_LEVELS).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  getStores(){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_STORES).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  isReception(list){
    return new Promise((resolve, reject) => {
      axios.post(global.IS_RECEPTION, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  getAll(list){
    return new Promise((resolve, reject) => {
      axios.post(global.GET_TREE_FORM, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

}