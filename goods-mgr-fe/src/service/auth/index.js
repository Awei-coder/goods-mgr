import axios from 'axios'

//  注册和登陆请求

export const register = (account, password) => {
  axios.post('http://localhost:3000/auth/register', {
    account,
    password,
  })

}

export const login = () => {

}
