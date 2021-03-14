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
      },
      {
        path: 'goods/:id',
        name: 'GoodDetail',
        component: () => import(/* webpackChunkName: "Goods" */ '../views/GoodDetail/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "Users" */ '../views/Users/index.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // 注册路由
  routes,
});

export default router;
