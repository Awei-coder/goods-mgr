import axios from 'axios'

// 设置默认值
export const list = (type = 'IN_COUNT', page = 1, size = 10) => {
  return axios.get(
    'http://localhost:3000/inventory-log/list', 
    {
      params: {
        type,
        page,
        size
      }
    }
  )
}