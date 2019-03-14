// exports.install = function (Vue, options) {
//   Vue.prototype.ajax = function (a,callback){
//     console.log(a)
//     if(a ===1){
//       res = 'llala';
//     }
//     callback(res);
//     // alert('aaaaaaa');
//   };
// };

let format = (value) => {
  return value >= 10 ? value : '0' + value
}

exports.install = function (Vue, options) {
  Vue.prototype.TimeOut = function (time, type){
    let date = new Date(time * 1000);
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let second = date.getSeconds()
    let result
    switch (type) {
      case 0: // 01-05
        result = `${format(month)}月${format(day)}日`
        break
      case 1: // 11:12
        result = `${format(hours)}:${format(minutes)}:${format(second)}`
        break
      case 2: // 2015-01-05
        result = `${year}-${format(month)}-${format(day)}`
        break
      case 3: // 2015-01-05 11:12
        result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`
        break
      case 4:// 2015-01-05 11:12:06
        result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`
        break
      case 5:// Jan 05, 2015 11:12:06
        result = date.format('M dd, yyyy HH:mm:ss')
        break
      case 6:// Jan 05, 2015
        result = date.format('M dd, yyyy')
        break
      case 7:// Jan 05, 2015
        result = `${year}年${format(month)}月${format(day)}日  ${format(hours)}:${format(minutes)}`
        break
    }

    return result;

  };
};

