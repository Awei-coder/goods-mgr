import { defineComponent, reactive } from 'vue'
import { user } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'

const defaultFormData = {
  account: '',
  password: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData))

    // 关闭按钮
    const close = () => {
      // 触发v-model双向绑定修改show
      context.emit('update:show', false)
    }

    // 提交按钮
    const submit = async () => {
      const form = clone(addForm)
      // 发送添加请求
      const res = await user.add(form.account, form.password)

      result(res).success((d, { data }) => {
        message.success(data.msg)
        // 浅拷贝清空表单
        Object.assign(addForm, defaultFormData)
        close()

        // 触发父组件的getList方法
        context.emit('getList')
      })
    }

    return {
      addForm,
      submit,
      props,
      close,
    }
  }
})