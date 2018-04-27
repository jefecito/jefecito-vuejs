import Vue from 'vue'
import Router from 'vue-router'
import CFG from '@/config'
import { store } from '../store'

/**
 * Public Views
 */
const IndexView = () => import('@/components/pages/IndexView')
const SignView = () => import('@/components/pages/SignView')
const UserAdministrationView = () => import('@/components/pages/admin/UserAdministrationView')

/**
 * Protected User Views
 */

/**
 * Admin Views
 */

Vue.use(Router)

const routes = [
  /**
   * Redirect everything to index
   */
  {
    path: '*',
    redirect: '/'
  },
  /**
   * Index
   */
  {
    path: '/',
    name: 'Index',
    component: IndexView
  },
  /**
   * Sing In / Sign Up
   */
  {
    path: '/sign',
    name: 'Sign',
    component: SignView
  },
  /**
   * Admin Views
   *
   * Users List
   */
  {
    path: '/admin/users',
    name: 'UserAdministration',
    component: UserAdministrationView,
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  /**
   * Auth
   *
   * Google Auth and Callbackthis.$store
   */
  {
    name: 'authGoogle',
    path: '/auth/google',
    beforeEnter (to, from, next) {
      window.location = 'http://localhost:3000/auth/google'
    }
  },
  /**
   * Callback Social Network Login
   */
  {
    path: '/auth/callback',
    beforeEnter (to, from, next) {
      if (!to.query.token) {
        window.location = '/'
      } else {
        store.dispatch('auth/getUser', {
          token: to.query.token
        })
      } // if/else
    }
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem(CFG.localStorage.userKey))
  const userIsAdmin = user && user.roles.indexOf('admin') !== -1

  // check auth
  if (to.meta.requiresAuth && !user) {
    next({
      name: 'Login'
    })
    return
  }

  // if the route is login and the user is logged in, redirect to index
  if (to.name === 'Login' && !!user) {
    next({
      name: 'Index'
    })
    return
  }

  // in this point, the user is logged in and do not have permissios or the view is public
  if (to.meta.role === 'admin' && !userIsAdmin) {
    // todo: go to author's default view
    next({
      name: 'Index'
    })
    return
  }

  // proced with the public view
  next()
})

export default router
