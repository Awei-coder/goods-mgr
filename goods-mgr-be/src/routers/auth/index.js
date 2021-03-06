const Router = require('@koa/router')
const mongoose = require('mongoose')

// 获取user表
const User = mongoose.model('User')

// 创建路由
const router = new Router({
  prefix: '/auth'
})

// 如果请求为 /auth/register
router.post('/register', async (ctx) => {

  const { account, password } = ctx.request.body

  const one = await User.findOne({
    account,
  }).exec()

  if (one) {
    ctx.body = {
      code: 0,
      msg: '用户已存在，注册失败',
      data: null
    }
    return
  }

  // // 注册用户
  const user = new User({
    account,
    password
  })

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }

  console.log(ctx.request.body);

})

router.post('/login', async (ctx) => {
  ctx.body = '登陆成功'
})

// 导出路由
module.exports = router
