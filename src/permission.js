import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  /* has token */
  if (store.getters['user/token']) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters['user/userRouter'].length === 0) {
        store.dispatch('user/SetUserRouter').then(() => {
          // store.dispatch('user/SetUserRouter', routerArr)
          router.addRoutes(store.getters['user/userRouter'])
          // 请求带有 redirect 重定向时，登录自动重定向到该地址
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            next({ ...to, replace: true })
          } else {
            next({ path: redirect })
          }
        })
      } else {
        next()
      }
      // if (store.getters.roles.length === 0) {
      //   // request login userInfo
      //   store
      //     .dispatch('GetInfo')
      //     .then(res => {
      //       const roles = res.result && res.result.role
      //       // generate dynamic router
      //       store.dispatch('GenerateRoutes', { roles }).then(() => {
      //         // 根据roles权限生成可访问的路由表
      //         // 动态添加可访问路由表
      //         router.addRoutes(store.getters.addRouters)
      //         // 请求带有 redirect 重定向时，登录自动重定向到该地址
      //         const redirect = decodeURIComponent(from.query.redirect || to.path)
      //         if (to.path === redirect) {
      //           // set the replace: true so the navigation will not leave a history record
      //           next({ ...to, replace: true })
      //         } else {
      //           // 跳转到目的路由
      //           next({ path: redirect })
      //         }
      //       })
      //     })
      // } else {
      //   next()
      // }
    }
  } else {
    if (allowList.includes(to.name)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
