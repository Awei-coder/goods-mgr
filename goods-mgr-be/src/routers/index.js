const auth = require('./auth/index')
const invite = require('./invite-code')
const good = require('./good')
const inventoryLog = require('./inventory-log')
const user = require('./user')

module.exports = (app) => {
  // 注册登陆注册路由
  app.use(auth.routes())
  // 注册邀请码路由
  app.use(invite.routes())
  // 注册商品路由
  app.use(good.routes())
  // 注册出入库路由
  app.use(inventoryLog.routes())
  // 注册用户路由
  app.use(user.routes())
}
