const Router = require('@koa/router')
const mongoose = require('mongoose')


// 获取Inventory表
const InventoryLog = mongoose.model('InventoryLog')

// 创建路由
const router = new Router({
  prefix: '/inventory-log'
})

router.get('/list', async (ctx) => {
  const {
    type,
  } = ctx.query

  let {
    page,
    size,
  } = ctx.query

  size = Number(size)
  page = Number(page)

  // 获取查询到几条日志
  const total = await InventoryLog.find({
    type,
  }).countDocuments().exec()


  const list = await InventoryLog
    .find({
      type,
    })
    .sort({
      // 倒序
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  ctx.body = {
    code: 1,
    msg: '查询出入库列表成功',
    data: {
      total,
      list,
      page,
      size,
    }
  }

})


// 导出路由
module.exports = router