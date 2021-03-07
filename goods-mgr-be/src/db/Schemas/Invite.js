const mongoose = require('mongoose')
const { getMeta } = require('../helps')

const InviteSchema = new mongoose.Schema({
  code: String,
  user: String,

  meta: getMeta(),
})

mongoose.model("InviteCode", InviteSchema)