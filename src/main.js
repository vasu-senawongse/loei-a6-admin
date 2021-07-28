// =========================================================
// * Vue Material Dashboard - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

// router setup
import routes from './routes/routes';

// Plugins
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import Notifications from './components/NotificationPlugin';

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard';

import Chartist from 'chartist';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueQuillEditor from 'vue-quill-editor';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme
// configure router
const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active',
});

Vue.prototype.$Chartist = Chartist;
Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});
