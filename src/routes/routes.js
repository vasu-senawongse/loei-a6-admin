import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';
import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import Place from './routes/place';
import Auth from './routes/auth';
import User from './routes/user';

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      ...Auth,
      ...User,
      ...Place,
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
];

export default routes;
