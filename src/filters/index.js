let format = (value) => {
  return value >= 10 ? value : '0' + value
}
/**
 * 时间格式化
 */
export const dateFilter = (time, type) => {
  let date = new Date(time * 1000)
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
  return result
}

Date.prototype.format = function (mask) {
  var d = this
  var zeroize = function (value, length) {
    if (!length) {
      length = 2
    }
    value = String(value)
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0'
    }
    return zeros + value
  }
  return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let monthsAll = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    switch ($0) {
      case 'd': return d.getDate()
      case 'dd': return zeroize(d.getDate())
      case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()]
      case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()]
      case 'M': return months[d.getMonth()]
      case 'MM': return zeroize(d.getMonth() + 1)
      case 'MMM': return months[d.getMonth()]
      case 'MMMM': return monthsAll[d.getMonth()]
      case 'yy': return String(d.getFullYear()).substr(2)
      case 'yyyy': return d.getFullYear()
      case 'h': return d.getHours() % 12 || 12
      case 'hh': return zeroize(d.getHours() % 12 || 12)
      case 'H': return d.getHours()
      case 'HH': return zeroize(d.getHours())
      case 'm': return d.getMinutes()
      case 'mm': return zeroize(d.getMinutes())
      case 's': return d.getSeconds()
      case 'ss': return zeroize(d.getSeconds())
      case 'l': return zeroize(d.getMilliseconds(), 3)
      case 'L': var m = d.getMilliseconds()
        if (m > 99) m = Math.round(m / 10)
        return zeroize(m)
      case 'tt': return d.getHours() < 12 ? 'am' : 'pm'
      case 'TT': return d.getHours() < 12 ? 'AM' : 'PM'
      case 'Z': return d.toUTCString().match(/[A-Z]+$/)
      // Return quoted strings with the surrounding quotes removed
      default: return $0.substr(1, $0.length - 2)
    }
  })
}

export const timeTypeFilter = (value) => {
  let typeText;
  if(value === 0){
    typeText = '180天';
  }else if(value === 1){
    typeText = '365天';
  }else if(value === 2){
    typeText = '730天';
  }else if(value === 3){
    typeText = '1096天';
  }else if(value === 4){
    typeText = '永久有效';
  }else if(value === 5){
    typeText = '次年清零';
  }else{
    typeText = '未知';
  }
  return typeText;
}

//字数长度过滤
export const fontFilter = (value,num) =>{
  // value = value.replace(/<[^>]+>/gim, '');    //过滤HTML标签
  value = value.substr(0, num)
  return value + ('...');
}


