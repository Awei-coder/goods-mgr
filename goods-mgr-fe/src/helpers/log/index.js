// 操作日志: 通过路径直接显示相应操作 文案

// 路径映射表
const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取自己的登陆信息'],
  ['/user/list', '获取用户列表'],
  ['/good-classify/list', '获取分类列表'],
  ['/good/list', '获取商品列表'],
  ['/good/add', '添加商品'],
  ['/good/getStore', '获取数据报表'],
  ['/upload/file', '上传文件'],
  ['/inventory-log/getSaleValue', '获取数据报表'],
  ['/invite/list', '获取邀请码列表'],
  ['/notice/list', '获取公告列表'],
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