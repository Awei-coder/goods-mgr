import axios from 'axios'

// 添加商品请求
export const add = (form) => {
  return axios.post(
    'http://localhost:3000/good/add',
    form,
  )
}

// 列表请求
export const list = (data) => {
  return axios.get('http://localhost:3000/good/list', {
    // 传递参数过去  服务端就可以ctx.query获取到参数
    params: data,
  })
}

// 删除请求
export const remove = (id) => {
  return axios.delete(
    // 'http://localhost:3000/good/' + id
    `http://localhost:3000/good/${id}`
  )
}

// 更新库存
export const updateCount = (data = {}) => {
  return axios.post(
    'http://localhost:3000/good/update/count', data
  )
}

// 修改商品信息
export const update = (data = {}) => {
  return axios.post(
    'http://localhost:3000/good/update', data
  )
}

// 查询商品详情页
export const detail = (id) => {
  return axios.get(
    `http://localhost:3000/good/detail/${id}`
  )
}