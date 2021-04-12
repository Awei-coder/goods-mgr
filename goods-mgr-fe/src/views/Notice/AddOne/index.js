import { defineComponent, reactive } from 'vue'
import { addOne } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'

const defaultFormData = {
  title: '',
  content: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },

  setup(props, context) {
    const addForm = reactive(clone(defaultFormData))

    const submit = async () => { 
      const res = await addOne.addNotice(addForm.title, addForm.content)

      result(res)
        .success(({msg}) => {
          message.success(msg)
          // 置空表单
          Object.assign(addForm, defaultFormData)
        })
    }

    // 关闭
    const close = () => {
      context.emit('update:show', false)
    }

    return {
      submit,
      close,
      props,
      addForm,
    }
  }
})