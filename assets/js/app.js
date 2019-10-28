import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueNotification from 'vue-notification'
import VueBootstrap from 'bootstrap-vue'

import store from '@/js/store'
import router from '@/js/routers'

import App from '@/js/components/App'

Vue.use(Vuelidate)
Vue.use(VueNotification)
Vue.use(VueBootstrap)

new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
