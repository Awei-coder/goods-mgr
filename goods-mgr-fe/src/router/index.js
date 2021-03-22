import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store'

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
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue')
      },
      {
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue')
      },
      {
        path: 'invite-code',
        name: 'inviteCode',
        component: () => import(/* webpackChunkName: "inviteCode" */ '../views/InviteCode/index.vue')
      },
      {
        path: 'good-classify',
        name: 'goodClassify',
        component: () => import(/* webpackChunkName: "goodClassify" */ '../views/GoodClassify/index.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile/index.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // 注册路由
  routes,
});

// 导航守卫
router.beforeEach(async (to, from, next) => {

  // 设置处理请求用户数据的数组
  // const reqArr = []

  // 如果stote下的character不为空 获取角色信息大全
  if(!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo')
  }

  // 进入先发送info请求
  if(!store.state.userInfo.length) {
    await store.dispatch('getUserInfo')
  }

  // 获取分类信息
  await store.dispatch('getGoodClassify')

  // 统一处理promise请求, all请求全部完成后
  // await Promise.all(reqArr)

  next()
})

export default router;
