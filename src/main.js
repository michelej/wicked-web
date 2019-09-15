import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap'
import "bootstrap/scss/bootstrap.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
