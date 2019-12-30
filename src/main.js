import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueGoogleCharts from 'vue-google-charts'

import 'bootstrap'
import "bootstrap/scss/bootstrap.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';



Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(VueGoogleCharts)

Vue.mixin({
  methods: {
    getVersion() {
      return JSON.parse(unescape(process.env.PACKAGE_JSON || '%7Bversion%3A0%7D')).version
    },
    formatDate(date) {
      const d = new Date(date)
      return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`
    },
    formatDateTime(date) {
      const d = new Date(date)
      return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()} 
      ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`
    }
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
