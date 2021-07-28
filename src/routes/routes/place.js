import Attraction from '@/pages/Places/Attraction.vue';
import EditAttraction from '@/pages/Places/EditAttraction.vue';
export default [
  {
    path: 'attractions',
    name: 'Attraction',
    component: Attraction,
  },
  {
    path: 'attractions/:id',
    name: 'EditAttraction',
    component: EditAttraction,
  },
];
