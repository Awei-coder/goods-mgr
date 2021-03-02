const Koa = require('koa')

const app = new Koa()


// 开启一个 http 服务
// 接受 http 请求 并作处理, 处理完响应
// https 默认端口443
app.listen(3000, () => {
  console.log('启动成功');
})