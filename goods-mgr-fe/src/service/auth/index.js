import axios from 'axios'

//  注册和登陆请求

export const register = (account, password, inviteCode) => {
  // 第二个为参数传过去后端, 返回一个promised
  return axios.post('http://localhost:3000/auth/register', {
    account,
    password,
    inviteCode,
  })
}

export const login = (account, password) => {
  return axios.post('http://localhost:3000/auth/login', {
    account,
    password
  })
}
