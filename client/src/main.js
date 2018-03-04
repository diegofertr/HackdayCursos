// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VeeValidate from "vee-validate";
Vue.use(Vuetify, {
  theme: {
    primary: '#d32f2f',
    accent: '#ff5252',
    secondary: '#bdbdbd',
    info: '#42a5f5',
    warning: '#ffb300',
    error: '#ff1744',
    success: '#81c784'
  }
})
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(VeeValidate);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
