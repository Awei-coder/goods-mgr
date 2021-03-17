// 数据库初始化  手动执行
const mongoose = require('mongoose')
const { connect } = require('../src/db/index')
const character = require('../src/helpers/character')

const { defaultCharacter } = character

const Character = mongoose.model('Character')

connect()
  .then(async () => {
    console.log('角色开始初始化');

    Character.insertMany(defaultCharacter)

    console.log('角色初始化完成');
  })