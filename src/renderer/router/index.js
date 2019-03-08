import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/components/home/HomeComponent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent,
    },
  ],
});
