const auth = require('./auth/index')
const invite = require('./invite-code')
const good = require('./good')

module.exports = (app) => {
  // 注册登陆注册路由
  app.use(auth.routes())
  // 注册邀请码路由
  app.use(invite.routes())
  // 注册商品路由
  app.use(good.routes())
}
