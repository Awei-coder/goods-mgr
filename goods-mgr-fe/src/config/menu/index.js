export default [
  {
    title: '商品管理',
    url: '/goods',
    onlyAdmin: false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '操作日志',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '其它',
    onlyAdmin: false,
    children: [
      {
        title: '重置密码列表',
        url: '/reset/password',
        onlyAdmin: true
      },
      {
        title: '邀请码',
        url: '/invite-code',
        onlyAdmin: true
      },
    ]
  },
]