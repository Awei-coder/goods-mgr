import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // 注册路由
  routes,
});

export default router;
