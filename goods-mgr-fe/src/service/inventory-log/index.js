import { get } from '@/helpers/request'

// 设置默认值
export const list = (type = 'IN_COUNT', page = 1, size = 10) => {
  return get(
    '/inventory-log/list', {
    type,
    page,
    size
  }

  )
}