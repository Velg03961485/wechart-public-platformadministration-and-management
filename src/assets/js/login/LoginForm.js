import userApi from '@/api/user'
export default {
  name: 'login-form',
  data () {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写帐号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
        ]
      }
    }
  },
  created: function () {
    //刚进页面的时候，把uername置空，防止浏览器倒退的时候，到这这个页面可以继续倒退
    //如果有记住密码这种操作，这步骤要删除
    localStorage.setItem('username', '')
  },
  mounted: function () {
  },
  methods: {
    reset() {
      this.$refs.loginForm.resetFields();
    },
    login() {
      console.log(0)
      // this.$router.replace({name: 'RemindList'})   //登录成功之后跳转的页面
      // this.$router.push({name: 'RemindList'})   //登录成功之后跳转的页面
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // let qs = require('querystring');
          // userApi.login(qs.stringify(this.$data.loginInfo)).then((res) => {
          //   if(res.data.errno === 0){
          //     localStorage.setItem('knock_knock', res.data.data.access_token)
          //     localStorage.setItem('username', res.data.data.user.username)
          //     this.$router.replace({name: 'menuSetting'})   //登录成功之后跳转的页面   跳微信列表页menuSetting
          //   }else{
          //     this.$message.error(res.data.msg);
          //   }
          // })

        //  新登录模式
          let qs = require('querystring');
          userApi.loginNew(qs.stringify(this.$data.loginInfo)).then((res) => {
            console.log(res);
            if(res.data.code === 0){
              // localStorage.setItem('knock_knock', res.data.data.access_token)
              // localStorage.setItem('username', res.data.data.user.username)
              localStorage.setItem('username', this.$data.loginInfo.username)
              this.$router.replace({name: 'menuSetting'})   //登录成功之后跳转的页面   跳微信列表页menuSetting
            }else{
              this.$message.error(res.data.msg);
            }
          })

        } else {
          return false
        }
      })
    }
  },
}
