const auth = require('./auth/index')

module.exports = (app) => {
  // 注册路由
  app.use(auth.routes())
}
