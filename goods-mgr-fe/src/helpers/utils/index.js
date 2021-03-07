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
        message.success(data.msg)
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