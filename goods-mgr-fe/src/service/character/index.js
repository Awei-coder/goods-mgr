import axios from 'axios'

// 设置默认值
export const list = () => {
  return axios.get(
    'http://localhost:3000/character/list', 
  )
}