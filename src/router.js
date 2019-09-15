import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './views/Dashboard/Dashboard.vue'
import CreateFinance from './views/Finances/Create/CreateFinance.vue'
import ListFinance from './views/Finances/List/ListFinance.vue'
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
        { path: 'finances/save/:type', name: 'CreateFinance', component: CreateFinance , props: true},       
        { path: 'finances/list', name: 'ListFinance', component: ListFinance}        
      ]
    }
    /*{ path: '**', redirect: '/login' }*/
  ]
})
