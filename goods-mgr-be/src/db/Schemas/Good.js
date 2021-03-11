const mongoose = require('mongoose')
const { getMeta } = require('../helps')

const GoodSchema = new mongoose.Schema({
  // 商品名
  name: String,
  // 价格
  price: Number,
  // 制造商
  manufacturer: String,
  // 出厂日期
  manufactureDate: String,
  // 分类
  classify: String,
  // 库存
  count: Number,
  
  // 基本信息
  meta: getMeta(),
})

mongoose.model('Good', GoodSchema)