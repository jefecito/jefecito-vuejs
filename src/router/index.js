import Vue from 'vue'
import Router from 'vue-router'
import CFG from '@/config'
import { store } from '@/store'

// Route Metas
const adminMeta = {
  requiresAuth: true,
  role: 'admin'
}

const userMeta = {
  requiresAuth: true,
  role: 'admin'
}

// Public Views
const IndexView = () => import('@/components/pages/IndexView')

// Auth Views
const SignView = () => import('@/components/pages/SignView')
const ResetPasswordView = () => import('@/components/pages/ResetPasswordView')

// Protected User Views

// Admin Views
const AdminView = () => import('@/components/pages/AdminView')
const UserTable = () => import('@/components/admin/UserTable')

// User Views
const UserView = () => import('@/components/pages/UserView')
const UserProfile = () => import('@/components/user/UserProfile')

Vue.use(Router)

const routes = [
  // Redirect everything to index
  {
    path: '*',
    redirect: '/'
  },

  // Index
  {
    path: '/',
    name: 'Index',
    component: IndexView
  },

  // Sing In / Sign Up
  {
    path: '/sign',
    name: 'Sign',
    component: SignView
  },

  // Admin Routes
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    redirect: '/',
    children: [
      // Users ABM
      {
        path: 'users',
        name: 'UserTable',
        component: UserTable,
        adminMeta
      }
    ]
  },

  // Users Routes
  {
    path: '/user',
    name: 'UserView',
    component: UserView,
    redirect: '/',
    children: [
      // User Settings
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile,
        userMeta
      }
    ]
  },

  // Auth
  // Google
  {
    name: 'authGoogle',
    path: '/auth/google',
    beforeEnter (to, from, next) {
      window.location = 'http://localhost:3000/auth/google'
    }
  },

  // LinkedIn
  {
    name: 'authLinkedin',
    path: '/auth/linkedin',
    beforeEnter (to, from, next) {
      window.location = 'http://localhost:3000/auth/linkedin'
    }
  },

  // Twitter
  {
    name: 'authTwitter',
    path: '/auth/twitter',
    beforeEnter (to, from, next) {
      window.location = 'http://localhost:3000/auth/twitter'
    }
  },

  // Facebook
  {
    name: 'authFacebook',
    path: '/auth/facebook',
    beforeEnter (to, from, next) {
      window.location = 'http://localhost:3000/auth/facebook'
    }
  },

  // Callback Social Network Login
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
  },

  // Confirm Email
  {
    path: '/user/confirm/:id',
    component: SignView,
    beforeEnter (to, from, next) {
      if (!to.params.id) {
        window.location = '/'
      } else {
        store.dispatch('auth/confirmEmail', {
          id: to.params.id
        })
        next()
      } // if/else
    }
  },

  // Reset Password
  {
    path: '/reset-password/:token',
    component: ResetPasswordView,
    props: (route) => ({
      token: route.params.token
    })
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem(CFG.localStorage.userKey))
  const userIsAdmin = user && user.roles.indexOf('admin') !== -1

  // Check auth
  if (to.meta.requiresAuth && !user) {
    next({
      name: 'Login'
    })
    return
  }

  // If the route is login and the user is logged in, redirect to index
  if (to.name === 'Login' && !!user) {
    next({
      name: 'Index'
    })
    return
  }

  // In this point, the user is logged in and do not have permissios or the view is public
  if (to.meta.role === 'admin' && !userIsAdmin) {
    // todo: go to author's default view
    next({
      name: 'Index'
    })
    return
  }

  // Proced with the public view
  next()
})

export default router
