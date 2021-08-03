import Attraction from '@/pages/Places/Attraction.vue';
import EditAttraction from '@/pages/Places/EditAttraction.vue';
import CreateAttraction from '@/pages/Places/CreateAttraction.vue';

import Hotel from '@/pages/Places/Hotel.vue';
import CreateHotel from '@/pages/Places/CreateHotel.vue';
import EditHotel from '@/pages/Places/EditHotel.vue';

import Restaurant from '@/pages/Places/Restaurant.vue';
import CreateRestaurant from '@/pages/Places/CreateRestaurant.vue';
import EditRestaurant from '@/pages/Places/EditRestaurant.vue';

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

  {
    path: 'hotels',
    name: 'Hotel',
    component: Hotel,
  },

  {
    path: 'hotels/create',
    name: 'CreateHotel',
    component: CreateHotel,
  },

  
  {
    path: 'hotels/:id',
    name: 'EditHotel',
    component: EditHotel,
  },

  {
    path: 'restaurants',
    name: 'Restaurant',
    component: Restaurant,
  },

  {
    path: 'restaurants/create',
    name: 'CreateRestaurant',
    component: CreateRestaurant,
  },

  {
    path: 'restaurants/:id',
    name: 'EditRestaurant',
    component: EditRestaurant,
  },
];
