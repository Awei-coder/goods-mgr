const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

// 创建用户规则
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
UserSchema.pre('save', preSave)

// 使用规则创建集合
mongoose.model("User", UserSchema)
