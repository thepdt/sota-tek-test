import { RouteConfig } from 'vue-router';
const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('src/pages/Tasks.vue'),
    meta: {
      requiresAuth: true,
      permission: 'user'
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
