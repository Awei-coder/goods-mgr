// 操作日志: 通过路径直接显示相应操作 文案

// 路径映射表
const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取自己的登陆信息']
]

export const getLogInfoByPath = (path) => {
  let title = ''

  LOG_MAP.forEach((item) => {
    // 如果包含此路径
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1])
    }
  })

  return title || path
}