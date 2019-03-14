import axios from 'axios'
import router from '../router/index'
import qs from 'qs'
axios.interceptors.request.use(function (config) {
    // let knock_knock = localStorage.getItem('knock_knock')

    // config.headers.post['Content-Type'] = '123';
    // if (knock_knock && knock_knock!==null && knock_knock!=='') {
    //         if(typeof config.data =='object'){
    //             config.data.append('access_token',knock_knock);
    //         }else if(config.method=='post'){
    //             let data = qs.parse(config.data)
    //             config.data = qs.stringify({
    //                 'access_token': knock_knock,
    //                 ...data
    //             });
    //         }else if(config.method=='get'){
    //             config.param = {
    //                 'access_token' : knock_knock,
    //                 ...config.params
    //             };
    //         }
    //     }
        let username = localStorage.getItem('username')
        if (username && username!==null && username!=='') {
          if(typeof config.data =='object'){
            // console.log('发送')
          }else if(config.method=='post'){
            // console.log('用了post请求')
            let data = qs.parse(config.data)
            config.data = qs.stringify({

              ...data
            });
          }else if(config.method=='get'){
            // console.log('用了get请求')
            config.param = {

              ...config.params
            };
          }
        }
    return config;
  }, function (err) {
    return Promise.reject(err);
  });

axios.interceptors.response.use(function (res) {
    // if (res.data.errno == 1000000 || res.data.msg=='access-token不能为空' || res.data.msg=='用户不存在') {
    //         localStorage.setItem('knock_knock', '')
    //         localStorage.setItem('username', '')
    //         router.replace({
    //             path: '/login',
    //             query: {redirect: router.currentRoute.fullPath}
    //         })
    //     }
    return res;
  }, function (err) {
    //  if (err.data.errno == 1000000 || err.data.msg=='access-token不能为空' || res.data.msg=='用户不存在') {
    //         localStorage.setItem('knock_knock', '')
    //         localStorage.setItem('username', '')
    //         router.replace({
    //             path: '/login',
    //             query: {redirect: router.currentRoute.fullPath}
    //         })
    //     }
    // return Promise.reject(err);
  });

