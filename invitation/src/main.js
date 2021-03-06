import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//Fontawesome configuration

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.prototype.$ebus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");