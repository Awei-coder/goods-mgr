import axios from 'axios'

export const list = (page, size) => {
  return axios.get('http://localhost:3000/log/list', {
    params: {
      page,
      size,
    }
  })
}