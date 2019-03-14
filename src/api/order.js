/**
 * 订单列表
 */
import axios from 'axios'

export default {
	orderList (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_ORDER_LIST,list).then((res) => {
					resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	deleOrder (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.DELE_ORDER,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},

	addOrder (list){
		return new Promise((resolve, reject) => {
			axios.post(global.ADD_ORDER_LIST,list).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	},
	//查询人脸ID
	findFaceId(list){
		return new Promise((resolve, reject) => {
			axios.post(global.FINDFACEID_ORDER,list).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	},
	editOrder (list){
		return new Promise((resolve, reject) => {
			axios.post(global.EDIT_ORDER_LIST,list).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	},

	postFace(list){
	  return new Promise((resolve,reject) =>{
	    axios.post(global.POST_ORDER_FACE,list,{headers: {
        'Content-Type': `multipart/form-data;`}}).then((res) => {
        resolve(res)
      }).then((res) => {
	      resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  postPhone(list){
    return new Promise((resolve,reject) =>{
      axios.post(global.CHECK_USER_PHONE,list).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  getMsg(list){
    return new Promise((resolve,reject) =>{
      axios.post(global.GET_SEND_MSG,list).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  checkMsg(list){
    return new Promise((resolve,reject) =>{
      axios.post(global.CHECK_MSG,list).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  postMe(list){
    return new Promise((resolve,reject) =>{
      axios.post(global.IS_NO_ME,list).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  addNPhone(list){
    return new Promise((resolve,reject) =>{
      axios.post(global.ADD_NEW_PHONE,list).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  addGoods(list){
    return new Promise((resolve,reject) =>{
      axios.post(global.ADD_GOODS,list).then((res) => {
        resolve(res)
      }).catch((err) =>{
        reject(err)
      })
    })
  },
  
}

