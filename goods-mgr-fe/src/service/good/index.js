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