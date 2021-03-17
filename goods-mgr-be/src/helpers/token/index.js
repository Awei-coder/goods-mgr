const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const koaJwt = require('koa-jwt')

// 获取token方法
const getToken = (ctx) => {
  let { authorization } = ctx.header
  // 处理token
  return authorization.replace('Bearer', '').replace('bearer', '').trim()
}

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err)
        return
      }
      // 解析后的结果
      resolve(payload)
    })
  })
}

// 规定检验秘钥, 以及规定哪些接口是不需要检验的
const middleware = (app) => {
  app.use(
    koaJwt({
      // 检验秘钥
      secret: config.JWT_SECRET,
    }).unless({
      // 哪些接口是不需要检验的
      path: [
        /^\/auth\/login/,
        /^\/auth\/register/,
      ],
    })
  )
}

const catchTokenError = async (ctx, next) => {
  // next捕捉到下一个中间件的错误
  return next().catch((error) => {
    if(error.status === 401) {
      ctx.status = 401

      ctx.body = {
        code: 0,
        msg: 'token error'
      }
    }else {
      throw error
    }
  })
}

module.exports = {
  verify,
  getToken,
  middleware,
  catchTokenError,
}