import User from '@/pages/Users/User.vue';
import UserProfile from '@/pages/Users/UserProfile.vue';
export default [
  {
    path: 'users/:id',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: 'users',
    name: 'Users',
    component: User,
  },
];
