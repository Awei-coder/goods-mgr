const { verify, getToken } = require('../token')
const mongoose = require('mongoose')
const Log = mongoose.model('Log')

// 日志中间件
const logMiddleware = async (ctx, next) => {
  const startTime = Date.now()

  await next()

  let payload = {}

  try {
    payload = await verify(getToken(ctx))
  } catch(e) {
    payload = {
      account: '未知用户',
      id: '',
    }
  }

  const url = ctx.url
  const method = ctx.method
  const status = ctx.status

  let responseBody = ''

  if(typeof ctx.body === 'string') {
    responseBody = ctx.body
  }else {
    try {
      // 如果为json对象就转为json字符串
      responseBody = JSON.stringify(ctx.body)
    } catch {
      responseBody = ''
    }
  }

  const endTime = Date.now()

  // 创建日志
  const log = new Log({
    user: {
      account: payload.account,
      id: payload.id
    },
    request: {
      url: url,
      responseBody,
      method: method,
      status,
    },
    startTime,
    endTime,
  })


  await log.save()

}

module.exports = {
  logMiddleware,
}