import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './assets/js/api/index'
import axios from 'axios';
import Vant from 'vant'
import 'vant/lib/index.css';
import "./assets/css/normalize.css";

Vue.prototype.$api = Api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

const apiURL  =  process.env.NODE_ENV == 'development'? '/api':'http://39.108.252.242:3000'; 

axios.defaults.baseURL = apiURL;
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
