const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const NoticeSchema = new mongoose.Schema({
  title: String,
  content: String,

  meta: getMeta(),
})

NoticeSchema.pre('save', preSave)

mongoose.model("Notice", NoticeSchema)