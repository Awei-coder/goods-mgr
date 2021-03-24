import axios from 'axios'

export const list = (page, size, keyword) => {
  return axios.get(
    'http://localhost:3000/user/list',
    {
      params: {
        page,
        size,
        keyword,
      }
    }
  )
}

export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/user/${id}`
  )
}

export const add = (account, password, character) => {
  return axios.post('http://localhost:3000/user/add', {
    account,
    password,
    character,
  })
}

export const resetPassword = (id) => {
  return axios.post('http://localhost:3000/user/reset/password', {
    id
  })
}

export const editCharacter = (characterId, userId) => {
  return axios.post('http://localhost:3000/user/update/character', {
    character: characterId,
    userId,
  })
}

// 拿到用户信息
export const info = () => {
  return axios.get('http://localhost:3000/user/info')
}

// 拿到服务器返回的文件名字并上传给服务端
export const addMany = (key) => {
  return axios.post('http://localhost:3000/user/addMany', {
    key
  })
}