/**
 * 当前用户登录、退出、修改密码、信息
 */
import axios from 'axios'
import JavaApi from '../config/javaAPI'    //请求java接口

export default {
	getUserInfo () {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_USER_INFO).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
	changePWD (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.CHANGE_PASSWORD, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  logout (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.LOGOUT, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  login (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.LOGIN, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
//  新登录接口
  loginNew (list) {
    return new Promise((resolve, reject) => {
      axios.post(JavaApi.LOGINFORM, list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },


}
