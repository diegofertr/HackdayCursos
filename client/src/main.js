import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";

Vue.use(Vuetify);

Vue.use(VeeValidate);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
