/**
 * 定义所有的常量
 */
// 接口地址
import apiUrl from './API.js'

const SERVER_IP = apiUrl.apiUrl
const COMMON = 'v1/'

//图片上传接口
global.LOADUP_IMAGES = `${SERVER_IP}${COMMON}user/upload`

/*标签管理*/
// post /v1/tag/tree-form
global.GET_TREE_FORM = `${SERVER_IP}${COMMON}tag/tree-form`


//微信公众号管理，调用鹰眼接口
global.WXGETPOSY = `${SERVER_IP}/mv1/merchant-organize/tree`
//公共调用鹰眼接口
global.HPHPOST_TREEFORM = `${SERVER_IP}${COMMON}tag/tree-form`    //树形结构标签

global.HPHPOST_STORETREE = `${SERVER_IP}${COMMON}merchant/tree`    //树形结构门店组织架构

global.HPHPOST_POSTIDFORSTORE = `${SERVER_IP}${COMMON}merchant/stores`    //根据id查询门店的名称

