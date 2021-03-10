import { message } from 'ant-design-vue';

// 抽离前端验证部分代码，简化逻辑

export const result = (response, authShowErroMsg = true) => {
  // 获取response里面的data
  const { data } = response

  // 判断是否返回错误
  if ((data.code === 0) && authShowErroMsg) {
    message.error(data.msg)
  }

  return {
    success(cd) {
      if (data.code !== 0) {
        // message.success(data.msg)
        // 调用传入的回调函数
        cd(data, response)
      }
      // return this后可以链式调用
      return this
    },
    fail(cd) {
      if (data.code === 0) {
        // 调用传入的回调函数
        cd(data, response)
      }
      return this
    },
    finally(cd) {
      // 调用传入的回调函数
      cd(data, response)
      return this
    }
  }
}

export const clone = (obj) => {
  // 实现深拷贝
  return JSON.parse(JSON.stringify(obj))
}

// 格式化出厂时间
export const formatTimeStamp = (ts) => {
  const date = new Date(Number(ts))
  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()

  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`
}