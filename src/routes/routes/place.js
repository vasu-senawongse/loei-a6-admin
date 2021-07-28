import Attraction from '@/pages/Places/Attraction.vue';
import EditAttraction from '@/pages/Places/EditAttraction.vue';
import CreateAttraction from '@/pages/Places/CreateAttraction.vue';
export default [
  {
    path: 'attractions',
    name: 'Attraction',
    component: Attraction,
  },
  {
    path: 'attractions/create',
    name: 'CreateAttraction',
    component: CreateAttraction,
  },
  {
    path: 'attractions/:id',
    name: 'EditAttraction',
    component: EditAttraction,
  },
];
