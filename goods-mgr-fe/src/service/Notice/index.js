import {post, get, del} from '@/helpers/request'

export const addNotice = (title, content) => {
  return post('/notice/add', {
    title,
    content,
  })
}