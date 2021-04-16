const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

// 获取需求表
const Demand = mongoose.model('Demand')

// 创建路由
const router = new Router({
  prefix: '/require'
})

// 获取需求
router.get('/list', async(ctx) => {

})

// 添加需求
router.post('/add', async (ctx) => {

})

// 更新需求
router.post('/update',async (ctx) => {

})

// 删除需求
router.delete('/:id', async (ctx) => {

})

module.exports = router