import axios from 'axios'

export default {
  getTreeCommonList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.HPHPOST_TREEFORM,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getStoreCommonList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.HPHPOST_STORETREE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  psotIdFormStoreName (list) {
    return  new  Promise((resolve, reject) => {
       axios.post(global.HPHPOST_POSTIDFORSTORE,list).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
}
