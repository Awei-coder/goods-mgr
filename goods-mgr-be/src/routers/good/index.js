const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const config = require('../../project.config')
const { loadExcel, getFirstSheet } = require('../../helpers/excel')
const { verify, getToken } = require('../../helpers/token')

// 出库入库常量
const GOOD_COUST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT',
}

// 获取商品表
const Good = mongoose.model('Good')
// 获取出入库日志表
const InventoryLog = mongoose.model('InventoryLog')
// 获取分类表
const Classify = mongoose.model('GoodClassify')

// 创建路由
const router = new Router({
  prefix: '/good'
})

// 列出商品接口
router.get('/list', async (ctx) => {
  // query 为地址 ?page=2&size=20 这些
  const {
    page = 1,
    keyword = '',
    // 这个是可视化所查询需要的id
    _id,
  } = ctx.query

  let {
    size
  } = ctx.query
  // 转为数字
  size = Number(size)
  // 如果keyword不为空
  let query = {}

  // 如果_id不为空
  if(_id) {
    query.classify = _id
  }
  if (keyword) {
    query.name = keyword
  }


  const list = await Good
    // find可以接收一个对象 按照对象里面给的属性当做条件去查找数据
    .find(query)
    .sort({
      // 倒序
      _id: -1,
    })
    // 跳过几页 共几条数据
    .skip((page - 1) * size)
    // 查询几条数据
    .limit(size)
    .exec()

  // 获取商品数量
  const total = await Good.countDocuments();

  ctx.response.body = {
    code: 1,
    msg: '列出商品成功',
    data: {
      list,
      total,
      page,
      size,
    }
  }
})

// 添加商品接口
router.post('/add', async (ctx) => {
  // 获取输入的商品信息
  const {
    name,
    price,
    manufacturer,
    manufactureDate,
    classify,
    count,
  } = getBody(ctx)

  // 创建商品
  const good = new Good({
    name,
    price,
    manufacturer,
    manufactureDate,
    classify,
    count,
  })

  // 商品插入表
  const res = await good.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res
  }
})

// method delete
// path /good/:id

// 删除一条商品
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const degMsg = await Good.deleteOne({
    _id: id,
  })

  ctx.body = {
    code: 1,
    msg: '删除商品成功',
    data: degMsg
  }

})

// 增加和减少库存接口
router.post('/update/count', async (ctx) => {
  const {
    id,
    type,
  } = getBody(ctx)

  // 获取到输入的库存数量
  let {
    num,
  } = getBody(ctx)

  num = Number(num)

  const good = await Good.findOne({
    _id: id
  }).exec()

  if (!good) {
    ctx.body = {
      code: 0,
      msg: '没有找到相关商品',
    }
    return
  }

  // 如果找到了商品
  if (type === GOOD_COUST.IN) {
    // 入库操作
    num = Math.abs(num)
  } else {
    // 出库操作
    num = -Math.abs(num)
  }

  good.count += num;

  // 如果库存为负数
  if (good.count < 0) {
    ctx.body = {
      code: 0,
      msg: '商品库存不足',
    }
    return
  }

  const res = await good.save()

  // 获取操作者
  const { account } = await verify(getToken(ctx))

  // 更新出入库记录
  const log = new InventoryLog({
    type,
    num: Math.abs(num),
    goodName: id,
    user: account,
  })

  log.save()

  ctx.body = {
    code: 1,
    msg: '进出库操作成功',
    data: res,
  }

})

// 更新接口
router.post('/update', async (ctx) => {
  // 获取前端传过来需要修改的数据
  const {
    id,
    // name,
    // price,
    // manufacturer,
    // manufactureDate,
    // classify,
    ...other
  } = getBody(ctx)

  const one = await Good.findOne({
    _id: id
  }).exec()

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到相关商品',
      data: res,
    }
  }

  // 处理传过来的数据
  const newQuery = {}

  //Object.entries() 例如:{name: 'zhangsan',age: 18} 转换为=> [['name','zhangsan'], ['age','18']]
  // [key, value] = ['name','zhangsan'] 解构出数据
  Object.entries(other).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value
    }
  })

  // 修改查找到的数据
  Object.assign(one, newQuery)

  // 保存数据插入表
  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '信息修改成功',
    data: res,
  }

})

// 商品详情接口
router.get('/detail/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const one = await Good.findOne({
    _id: id
  })

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '没有找到相关商品',
    }
    return
  }

  ctx.body = {
    code: 1,
    msg: '查询成功',
    data: one
  }

})

// 批量添加商品
router.post('/addMany', async (ctx) => {
  const {
    key = ''
  } = getBody(ctx)

  const path = `${config.UPLOAD_DIR}/${key}`

  // 获取到excel
  const excel = loadExcel(path)

  // 解析excel成数组形式
  const sheet = getFirstSheet(excel)

  const arr = []
  for (let i = 0; i < sheet.length; i++) {
    let record = sheet[i]
    const [
      name,
      price,
      manufacturer,
      manufactureDate,
      classify,
      count,
    ] = record

    let classifyId = classify

    // 查找分类的id
    const one = await Classify.findOne({
      // 这里传的是excel表传进来的名字 -> 例如'食品'
      title: classifyId
    })

    if (one) {
      // 如果存在就把这个分类的id赋值给classifyId
      classifyId = one._id
    }

    arr.push({
      name,
      price,
      manufacturer,
      // 处理时间
      manufactureDate: (new Date(1900, 0, manufactureDate)).valueOf(),
      classify: classifyId,
      count,
    })

  }

  await Good.insertMany(arr)

  ctx.body = {
    code: 1,
    msg: '批量添加成功',
    data: {
      addCount: arr.length
    }
  }
})

// 获取分类库存信息
router.get('/getStore', async(ctx) => {

  // 最终返回一个数组
  const result = []

  // 获取全部商品
  const res = await Good.find()
  // 获取分类数量
  const classify = await Classify
    .find()
    .sort({
      _id: -1
    })
    .exec()

    // 获取各个分类商品的总数
  classify.forEach(classifyItem => {
    let total = 0
    res.forEach(resItem => {
      if(classifyItem._id == resItem.classify) {
        total += resItem.count
      }
    })
    result.push(total)
  })

  ctx.body = {
    code: 1,
    msg: '获取库存信息成功',
    data: result,
  }
})

module.exports = router