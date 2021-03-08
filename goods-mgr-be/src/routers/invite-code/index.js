const Router = require('@koa/router')
const mongoose = require('mongoose')
// 引入uuid创建唯一邀请码
const { v4: uuidv4 } = require('uuid')

// 获取invite表
const InviteCode = mongoose.model('InviteCode')

// 创建路由
const router = new Router({
  prefix: '/invite'
})

// 接收到添加请求时
router.get('/add', async (ctx) => {

  // 创建邀请码
  const inviteCode = new InviteCode({
    code: uuidv4(),
    user: '',
  })

  // 插入表
  const res = await inviteCode.save()

  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: res
  }

})

// 导出路由
module.exports = router