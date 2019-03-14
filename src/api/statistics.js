/**
 * 客流统计
 */
import axios from 'axios'

export default {
	getCustomer (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_CUSTOMER,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	getFeature (list) {
	    return new Promise((resolve, reject) => {
	      axios.post(global.GET_FEATURE,list).then((res) => {
	        resolve(res)
	      }).catch((err) => {
	        reject(err)
	      })
	    })
	},
	
}