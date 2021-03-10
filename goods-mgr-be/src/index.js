const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const { connect } = require('./db')
const Routes = require('./routers/index')

const app = new Koa()

// 连接数据库成功后并进行下一步操作
connect().then(() => {
  
  // 使用koa/cors解决同源问题  增加http请求头的方式解决跨域问题
  app.use(cors())
  // 使用koa-body中间件
  app.use(koaBody())
  
  // 注册登陆注册路由
  Routes(app)

  // 开启一个 http 服务
  // 接受 http 请求 并作处理, 处理完响应
  // https 默认端口443
  app.listen(3000, () => {
    console.log('启动成功');
  })
})


