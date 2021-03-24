import axios from 'axios'
import { getToken } from '../../helpers/token'

// 设置默认请求头, 把token带过去  不限于这个文件, 全局配置, 发送请求都会把token带过去服务端
axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`

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

// 拿到服务器返回的文件名字并上传给服务端
export const addMany = (key) => {
  return axios.post('http://localhost:3000/good/addMany', {
    key
  })
}