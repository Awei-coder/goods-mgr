const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

// 获取公告表
const Notice = mongoose.model('Notice')

// 创建路由
const router = new Router({
  prefix: '/notice'
})

// 获取公告
router.get('/list', async (ctx) => {

})

// 添加公告
router.post('/add', async (ctx) => {
  const {
    title,
    content,
  } = getBody(ctx)

  if(title === '' || content === '') {
    ctx.body = {
      code: 0,
      msg: '不能为空！'
    }
    return
  }

  // 创建公告
  const notice = new Notice({
    title,
    content
  })

  // 公告插入表
  const res = await notice.save()

  ctx.body = {
    code: 1,
    msg: '创建成功',
    data: res
  }
})

// 删除公告
router.delete('/:id', async (ctx) => {

})

// 更新公告
router.post('/update', async (ctx) => {

})

module.exports = router