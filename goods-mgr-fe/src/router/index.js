import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "basicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      // 设置嵌套路由
      {
        path: 'goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "Goods" */ '../views/Goods/index.vue')
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // 注册路由
  routes,
});

export default router;
