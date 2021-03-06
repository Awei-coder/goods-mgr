const mongoose = require('mongoose')
const { getMeta } = require('../helps')

// 创建用户规则
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMeta(),
})

// 使用规则创建集合
mongoose.model("User", UserSchema)
