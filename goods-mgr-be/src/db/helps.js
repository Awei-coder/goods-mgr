// 抽离数据库公共信息代码

const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: (new Date()).getTime(),
    },
    updatedAt: {
      type: Number,
      default: (new Date()).getTime(),
    }
  }
}

module.exports = {
  getMeta,
}
