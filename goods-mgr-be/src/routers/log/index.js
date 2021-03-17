const Router = require('@koa/router')
const mongoose = require('mongoose')


// 获取log表
const log = mongoose.model('Log')

// 创建路由
const router = new Router({
  prefix: '/log'
})

// 获取日志列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.query

  page = Number(page)
  size = Number(size)

  const list = await log
    .find()
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await log.countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total,
    }
  }

})

// 导出路由
module.exports = router