// 封装路由获取body, 减少重复代码
const getBody = (ctx) => {
  // 返回请求体
  return ctx.request.body || {}
}

module.exports = {
  getBody,
};