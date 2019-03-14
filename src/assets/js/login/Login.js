import LoginForm from '@/views/login/LoginForm'

export default {
  name: 'home',
  components: {
    LoginForm
  },
  data () {
    return {
    }
  },
  created: function () {
    // 调整窗口尺寸事件
    window.addEventListener('resize', this.handleResize)
    // 设置显示内容
    let pathName = this.$route.name.toLowerCase()
  },
  mounted: function () {
    // 背景粒子效果
    window.particlesJS.load('particles-js', 'static/js/particles/particles.json')

    // 自动设置页面高度
    this.handleResize()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      let pathName = this.$route.name.toLowerCase()
      this.show = pathName

      this.handleResize()
    },
    handleResize () {
      let home = document.querySelector('.home')
      if (home) {
        home.style.height = 0 + 'px'
        // 兼容firefox ie google
        let h = document.body.scrollHeight === 0 ? document.documentElement.scrollHeight : document.body.scrollHeight
        // 自动设置页面高度
        if (window.innerHeight <= 800) {
          home.style.height = (h + 30) + 'px'
        } else {
          home.style.height = h + 'px'
        }
      }
    }
  }
}
