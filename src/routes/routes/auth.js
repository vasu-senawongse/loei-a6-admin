import Login from '@/pages/Auth/Login.vue';
import Logout from '@/pages/Auth/Logout.vue';

export default [
  {
    path: 'login',
    name: 'Login',
    component: Login,
  },
  {
    path: 'logout',
    name: 'Logout',
    component: Logout,
  },
];
