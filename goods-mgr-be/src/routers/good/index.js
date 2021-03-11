const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

// 出库入库常量
const GOOD_COUST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT',
}

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
    keyword = '',
  } = ctx.query

  let {
    size
  } = ctx.query
  // 转为数字
  size = Number(size)
  // 如果keyword不为空
  let query = {}

  if(keyword) {
    query.name = keyword
  }


  const list = await Good
  // find可以接收一个对象 按照对象里面给的属性当做条件去查找数据
  .find(query)
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
    count,
  } = getBody(ctx)

  // 创建商品
  const good = new Good({
    name,
    price,
    manufacturer,
    manufactureDate,
    classify,
    count,
  })

  // 商品插入表
  const res = await good.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  }
})

// method delete
// path /good/:id

// 删除一条商品
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const degMsg = await Good.deleteOne({
    _id: id,
  })

  ctx.body = {
    code: 1,
    msg: '删除商品成功',
    data: degMsg
  }

})

// 增加和减少库存接口
router.post('/update/count', async (ctx) => {
  const {
    id,
    type,
  } = getBody(ctx)

  // 获取到输入的库存数量
  let {
    num,
  } = getBody(ctx)

  num = Number(num)

  const good = await Good.findOne({
    _id: id
  }).exec()

  if(!good) {
    ctx.body = {
      code: 0,
      msg: '没有找到相关商品',
    }
    return
  }

  // 如果找到了商品
  if(type === GOOD_COUST.IN) {
    // 入库操作
    num = Math.abs(num)
  }else {
    // 出库操作
    num = -Math.abs(num)
  }

  good.count += num;

  // 如果库存为负数
  if(good.count < 0) {
    ctx.body = {
      code: 0,
      msg: '商品库存不足',
    }
    return
  }

  const res = await good.save()

  ctx.body = {
    code: 1,
    msg: '进出库操作成功',
    data: res,
  }

})

module.exports = router