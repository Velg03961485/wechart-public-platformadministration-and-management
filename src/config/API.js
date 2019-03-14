//设置所有请求的域名前缀
let apiUrl = '';
let routerMode = 'history';
let DEBUG = false;
let cancleHTTP = [];//取消请求头设置；
// const apiUrl = 'http://test.yy_api.ibetwo.com/';
if (process.env.NODE_ENV == 'development') {
   // apiUrl = "http://dev-api.yy.ibetwo.com/";
  apiUrl = "http://test-api.common.ibetwo.com/"
   DEBUG = true;
}else if(process.env.NODE_ENV == 'production'){
   apiUrl = "http://dev-api.yy.ibetwo.com/";
   DEBUG = false;
}else if(process.env.NODE_ENV == 'testing'){
   // apiUrl = "http://test-api.yy.ibetwo.com/";
   apiUrl = "http://test-api.common.ibetwo.com/"
   DEBUG = false;
}
export default{
    apiUrl,
    routerMode,
    DEBUG,
    cancleHTTP
}
