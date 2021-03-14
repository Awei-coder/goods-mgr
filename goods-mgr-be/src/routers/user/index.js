const Router = require('@koa/router')
const mongoose = require('mongoose')
const {getBody} = require('../../helpers/utils')
const config = require('../../project.config')
const User = mongoose.model('User')

const router = new Router({
  prefix: '/user'
})

// 获取用户列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.query

  page = Number(page)
  size = Number(size)
  
  const list = await User.find()
  .sort({
    _id: -1,
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec()

  const total = await User.countDocuments().exec()
  
  ctx.body = {
    code: 1,
    msg: '查询用户成功',
    data: {
      list,
      total,
      page,
      size,
    }
  }

})

// 删除用户操作
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const delMsg = await User.deleteOne({
    _id: id
  }).exec()

  ctx.body = {
    code: 1,
    msg: '删除用户成功',
    data: delMsg,
  }
})

// 添加用户操作
router.post('/add', async (ctx) => {
  const {
    account,
    password,
  } = getBody(ctx)

  const user = new User({
    account,
    password: password || '123456'
  })

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res,
  }

})

// 重置密码
router.post('/reset/password', async (ctx) => {
  const {
    id
  } = getBody(ctx)

  const user = await User.findOne({
    _id: id
  })

  if(!user) {
    ctx.body = {
      code: 0,
      msg: '用户不存在',
    }
    return
  }

  user.password = config.DEFAULT_PASSWORD

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '重置密码成功',
    data: {
      id: res._id,
      account: res.account,
    }
  }

})

module.exports = router