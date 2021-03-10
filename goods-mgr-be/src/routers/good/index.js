const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

// 获取商品表
const Good = mongoose.model('Good')

// 创建路由
const router = new Router({
  prefix: '/good'
})

// 列出商品接口
router.get('/list', async (ctx) => {
  // query 为地址 ?page=2&size=20 这些
  const {
    page = 1,
  } = ctx.query

  let {
    size
  } = ctx.query
  // 转为数字
  size = Number(size)
  
  const list = await Good
  .find()
  // 跳过几页 共几条数据
  .skip((page - 1) * size)
  // 查询几条数据
  .limit(size)
  .exec()

  // 获取商品数量
  const total = await Good.countDocuments();
  
  ctx.response.body = {
    code: 1,
    msg: '列出商品成功',
    data: {
      list,
      total,
      page,
      size,
    }
  }
})

// 添加商品接口
router.post('/add', async (ctx) => {
  // 获取输入的商品信息
  const {
    name,
    price,
    manufacturer,
    manufactureDate,
    classify,
  } = getBody(ctx)

  // 创建商品
  const good = new Good({
    name,
    price,
    manufacturer,
    manufactureDate,
    classify,
  })

  // 商品插入表
  const res = await good.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  }
})


module.exports = router