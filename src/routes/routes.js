import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Document from '@/pages/Document/Document.vue';;
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
      {
        path: 'document',
        name: 'Document',
        component: Document,
      },
    ],
  },
];

export default routes;
