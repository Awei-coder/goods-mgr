const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const DemandSchema = new mongoose.Schema({
  // 标题
  title: String,
  // 发布者
  promulgator: String,
  // 内容
  content: String,
  // 用户备注
  userAttach: String,
  // 处理状态
  status: Number,
  // 处理人
  handler: String,
  adminAttach: String,
  meta: getMeta(),
})

DemandSchema.pre('save', preSave)

mongoose.model('Demand', DemandSchema)