import Vue from 'vue'
import App from './components/App.vue';
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
    position:"top-right",
    errorDuration: 3000,
    successDuration: 3000,
    warningInfoDuration: 3000
  });

new Vue({
  el: '#app',
  render: h => h(App)
})
