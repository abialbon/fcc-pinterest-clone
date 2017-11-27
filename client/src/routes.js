import Home from './components/Home.vue';
import AllPins from './components/AllPins.vue';
import UserPins from './components/UserPins.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/pins', component: AllPins },
  { path: '/mypins', component: UserPins }
];
