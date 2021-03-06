import Home from './components/Home.vue';
import AllPins from './components/AllPins.vue';
import UserPins from './components/UserPins.vue';
import Authenticate from './components/Authenticate.vue';
import AddPin from './components/AddPin.vue';

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export const routes = [
  { path: '/', component: Home },
  { path: '/pins', component: AllPins },
  { path: '/mypins', component: UserPins },
  { path: '/mypins/add', component: AddPin },
  { path: '/authenticate', component: Authenticate }
];
