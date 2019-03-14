export default {
  getCodeNum(){
    Vue.prototype.getBytesLength = function () {
      var totalLength = 0;
      var charCode;
      for (var i = 0; i < this.length; i++) {
        charCode = this.charCodeAt(i);
        if (charCode < 0x007f)  {
          totalLength++;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff))  {
          totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff))  {
          totalLength += 3;
        } else{
          totalLength += 4;
        }
      }
      return totalLength;
    }
  },
  tiemAsFor(){
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
  }

}

// exports.install = function (Vue, options) {
//
//
//   Vue.prototype.getBytesLength = function (val) {
//     console.log(val)
//     var totalLength = 0;
//     var charCode = val.toString();
//
//     console.log(charCode);
//     console.log(charCode.length);
//     for (var i = 0; i < charCode.length; i++) {
//       // charCode = this.charCodeAt(i);
//       console.log(charCode[i])
//       charCode = JSON.stringify(charCode[i])
//       console.log(charCode)
//       if (charCode < 0x007f)  {
//         totalLength++;
//       } else if ((0x0080 <= charCode) && (charCode <= 0x07ff))  {
//         totalLength += 2;
//       } else if ((0x0800 <= charCode) && (charCode <= 0xffff))  {
//         totalLength += 3;
//       } else{
//         totalLength += 4;
//       }
//     }
//     console.log(totalLength)
//     return totalLength;
//   }
//
//
//
// };
