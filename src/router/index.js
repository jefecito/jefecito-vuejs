import Vue from 'vue'
import Router from 'vue-router'

/**
 * Public Views
 */
const IndexView = () => import('@/components/pages/IndexView')
const SignView = () => import('@/components/pages/SignView')

/**
 * Protected User Views
 */

/**
 * Admin Views
 */

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    name: 'Index',
    component: IndexView
  }, {
    path: '/sign',
    name: 'Sign',
    component: SignView
  }, {
    path: '/',
    name: 'UserAdministration',
    component: IndexView
  }, {
    path: '/',
    name: 'UserSettings',
    component: IndexView
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
