import Users from '@/pages/User/Users.vue';
import UserProfile from '@/pages/User/UserProfile.vue';
export default [
  {
    path: 'users/:id',
    name: 'User Profile',
    component: UserProfile,
  },
  {
    path: 'users',
    name: 'Users',
    component: Users,
  },
];
