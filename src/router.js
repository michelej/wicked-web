import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './views/Dashboard/Dashboard.vue'
import CreateFinance from './views/Finances/CreateFinance.vue'
import Navbar from './views/Navbar/Navbar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/main' },    
    {
      path: '/main', name: 'Navbar', component: Navbar, children: [        
        { path: '/', redirect: 'dashboard' },
        { path: 'dashboard', name: 'Dashboard', component: Dashboard },
        { path: 'finances/save', name: 'CreateFinance', component: CreateFinance }        
      ]
    }
    /*{ path: '**', redirect: '/login' }*/
  ]
})
