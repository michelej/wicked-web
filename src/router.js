import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './views/Dashboard/Dashboard.vue'
import CreateFinance from './views/Finances/Create/CreateFinance.vue'
import ListFinance from './views/Finances/List/ListFinance.vue'
import ResumeFinance from './views/Finances/Resume/ResumeFinance.vue'
import Login from './views/Login/Login.vue'
import Navbar from './views/Navbar/Navbar.vue'
import auth from './services/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/main', name: 'Navbar', component: Navbar, children: [
        { path: '/', redirect: 'finances/list' },
        { path: 'dashboard', name: 'Dashboard', component: Dashboard },
        { path: 'finances/save/:type', name: 'CreateFinance', component: CreateFinance, props: true },
        { path: 'finances/edit/:type/:id', name: 'EditFinance', component: CreateFinance, props: true },
        { path: 'finances/list', name: 'ListFinance', component: ListFinance },
        { path: 'finances/resume', name: 'ResumeFinance', component: ResumeFinance }
      ]
    }
    /*{ path: '**', redirect: '/login' }*/
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    if (auth.isAuthenticated()) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router