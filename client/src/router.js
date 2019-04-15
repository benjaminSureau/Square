import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Index.vue';
import Search from './views/Search.vue';
import Company from './views/Company.vue';
import Notification from './views/Notification.vue';
import Job from './views/Job.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification,
    },
    {
      path: '/job',
      name: 'job',
      component: Job,
    },
  ],
});
