import auth from '@/api/auth'

const state = { //存储一开始的登录状态和用户
  user: null,
  isLogin: false
}

const getters = { //映射到这里有啥用
  user: state => state.user,
  isLogin: state => state.isLogin
}

const mutations = {
  setUser(state, payload) {//登录时会调用setUser 用来将传递过来的user赋值给user属性
    state.user = payload.user
  },

  setLogin(state, payload) { //获取你传递的登录状态,传递给isLogin属性
    state.isLogin = payload.isLogin
  }
}

const actions = {
  //根据你传递的用户名和密码看下是否成功登录
  //如果成功,那就设置好用户名和登录状态
  login({ commit }, { username, password }) {
    return auth.login({ username, password }) //登录成功后会去执行存储用户名和登录状态的代码
      .then(res => {
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
      })
  },
  //下面这种写法也是异步，和上面这个差不多
  async register({ commit }, { username, password }) {
    let res = await auth.register({ username, password })
    commit('setUser', { user: res.data })
    commit('setLogin', { isLogin: true })
    return res.data
  },

  async logout({ commit }) {
    await auth.logout()
    commit('setUser', { user: null })
    commit('setLogin', { isLogin: false })
  },

  async checkLogin({ commit, state}) {
    if(state.isLogin) return true
    let res = await auth.getInfo()
    commit('setLogin', { isLogin: res.isLogin })
    if(!res.isLogin) return false
    commit('setUser', { user: res.data })
    return true
  }

  /*
    this.logout().then(isLogin=>{

    })

  */
}

export default {
  state,
  getters,
  mutations,
  actions
}
