import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Document from '@/pages/Document/Document.vue';
import Tutorial from '@/pages/Tutorial/Tutorial.vue';
import Organization from '@/pages/Organization/Organization.vue';
import CreateOrganization from '@/pages/Organization/CreateOrganization.vue';
import Product from '@/pages/Product/Product.vue';
import CreateProduct from '@/pages/Product/CreateProduct.vue';
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
      {
        path: 'organization',
        name: 'Organization',
        component: Organization,
      },
      {
        path: 'organization/create',
        name: 'CreateOrganization',
        component: CreateOrganization,
      },
      {
        path: 'product',
        name: 'Product',
        component: Product,
      },
      {
        path: 'product/create',
        name: 'CreateProduct',
        component: CreateProduct,
      },
      {
        path: '/tutorial',
        name: 'Tutorial',
        component: Tutorial,
      },
    ],
  },
];

export default routes;
