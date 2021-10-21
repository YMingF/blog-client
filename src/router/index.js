import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/template.vue'
import Login from '@/pages/Login/template.vue'
import Detail from '@/pages/Detail/template.vue'
import Edit from '@/pages/Edit/template.vue'
import Create from '@/pages/Create/template.vue'
import Register from '@/pages/Register/template.vue'
import User from '@/pages/User/template.vue'
import My from '@/pages/My/template.vue'

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: Create,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: User
    },
    {
      path: '/my',
      component: My,
      meta: { requiresAuth: true }
    }
  ]
})

//每次路由切换都会去执行这个函数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {//如果它没有登录,就跳转到登录页面
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })

  } else {
    next() // 确保一定要调用 next()
  }
})

export  default router
