const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const { verify, getToken } = require('../../helpers/token')

// 获取需求表
const Demand = mongoose.model('Demand')
// 获取角色表
const character = mongoose.model('Character')

// 创建路由
const router = new Router({
  prefix: '/demand'
})

// 获取需求
router.get('/list', async (ctx) => {
  const {
    page = 1,
  } = ctx.query

  let {
    size,
  } = ctx.query

  size = Number(size)

  // 获取操作者
  const { character: c, account } = await verify(getToken(ctx))
  const actioner = await character.findOne({
    _id: c
  })

  if (actioner.title === '管理员') {
    const list = await Demand
      .find()
      .sort({ _id: -1 })
      .skip((page - 1) * size)
      .limit(size)
      .exec()

    const total = await Demand.countDocuments().exec()

    ctx.body = {
      code: 1,
      msg: '获取需求列表成功',
      data: {
        list,
        total,
      }
    }

    return
  }

  const list = await Demand
    .find({
      promulgator: account
    })
    .sort({ _id: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await Demand.countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '获取需求列表成功',
    data: {
      list,
      total,
    }
  }

})

// 添加需求
router.post('/add', async (ctx) => {
  const {
    title,
    content,
    handler,
    userAttach,
    adminAttach,
  } = getBody(ctx)

  let {
    status,
  } = getBody(ctx)

  status = Number(status)

  const { account } = await verify(getToken(ctx))

  const one = new Demand({
    promulgator: account,
    title,
    content,
    userAttach,
    status,
    handler,
    adminAttach,
  })

  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '创建成功',
    data: res
  }
})

// 更新需求
router.post('/update', async (ctx) => {
  const editForm = getBody(ctx)

  const one = await Demand.findOne({
    _id: editForm._id
  })


  if (!one) {
    ctx.body = {
      code: 0,
      msg: '需求不存在'
    }
    return
  }

  Object.assign(one, editForm)

  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  }

})

// 删除需求
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const res = await Demand.deleteOne({
    _id: id
  }).exec()

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }

})

module.exports = router