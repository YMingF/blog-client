import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['login']), //将auth.js里的异步操作login映射过来

    onLogin() {
      //当我点击立即登录按钮时，就执行onLogin,
      //然后去调用异步函数login，传递用户名和密码
      this.login({username: this.username, password: this.password})//这个也会返回一个promise对象,让你能够跳转到首页
        .then(()=>{
          //登录的时候看下redirect属性里是啥值,如果有就跳转到对应网址，若没有就是/
          this.$router.push({path:this.$route.query.redirect || '/'})
        })
    }
  }
}
