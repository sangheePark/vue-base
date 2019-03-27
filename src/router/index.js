import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () =>
                import ('@/views/redirectView')
  }]
},
{
  path: '/login',
  component: () =>
            import ('@/views/loginView'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
            import ('@/views/authredirectView'),
  hidden: true
},
{
  path: '/404',
  component: () =>
            import ('@/views/404View'),
  hidden: true
},
{
  path: '/401',
  component: () =>
            import ('@/views/401View'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
                import ('@/views/dashboard/dashboardView'),
    name: 'Dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
  }]
}
]
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export default router


NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.includes('admin')) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log('check')
  next()
  // if (store.getters.isLogin()) {
  //   // determine if there has token
  //   console.log('get')
  //   /* has token*/
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
  //     if (store.getters.roles.length === 0) {
  //       console.log('hasNot role')
  //       // store
  //       //   .dispatch('GetUserInfo')
  //       //   .then(() => {
  //       //     const roles = ['admin'] // note: roles must be a object array! such as: [{id: '1', name: 'editor'}, {id: '2', name: 'developer'}]
  //       //     store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
  //       //       router.addRoutes(accessRoutes)
  //       //       next({ ...to, replace: true }) // set the replace: true so the navigation will not leave a history record
  //       //     })
  //       //   })
  //       //   .catch(err => {
  //       //     // store.dispatch('FedLogOut').then(() => {
  //       //     //   Message.error(err)
  //       //     //   next({ path: '/' })
  //       //     // })
  //       //   })
  //       // const roles = ['ROLES_SUPER_ADMIN']
  //       // store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
  //       //   router.addRoutes(accessRoutes)
  //       //   next({...to, replace: true }) // set the replace: true so the navigation will not leave a history record
  //       // })
  //     } else {
  //       console.log('has role')
  //       if (hasPermission(store.getters.roles, to.meta.roles)) {
  //         next()
  //       } else {
  //         next({ path: '/401', replace: true, query: { noGoBack: true } })
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     console.log('notoken')
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})