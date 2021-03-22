import axios from 'axios'

export const list = () => {
  return axios.get('http://localhost:3000/good-classify/list')
}

export const add = (title) => {
  return axios.post('http://localhost:3000/good-classify/add', {
    title
  })
}

export const update = (id, title) => {
  return axios.post('http://localhost:3000/good-classify/update/title', {
    id,
    title
  })
}

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/good-classify/${id}`)
}
