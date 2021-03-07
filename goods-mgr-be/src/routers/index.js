const auth = require('./auth/index')
const invite = require('./invite-code')

module.exports = (app) => {
  // 注册登陆注册路由
  app.use(auth.routes())
  // 注册邀请码路由
  app.use(invite.routes())
}
