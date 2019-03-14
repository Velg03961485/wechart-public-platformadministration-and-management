/**
 * 获取当前日期和时间
 */
export const getToday = () => {
  let today = new Date()
  return today.format('M dd, yyyy HH:mm:ss')
}

export const getDateTime = (value) => {
  let newValue = (new Date(value).getTime()) / 1000
  return newValue
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
