import { defineComponent, reactive } from 'vue'
import { good } from '@/service'
import { result, clone} from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store'

const defaultFormData = {
  name: '',
  price: 0,
  manufacturer: '',
  manufactureDate: 0,
  classify: '',
  count: 0,
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData))

    // 设置分类默认值
    if (store.state.goodClassifyList.length) {
      addForm.classify = store.state.goodClassifyList[0]._id
    }

    // 提交按钮
    const submit = async () => {
      const form = clone(addForm)
      // 把moment对象转换成时间戳
      form.manufactureDate = addForm.manufactureDate.valueOf()
      // 发送添加请求
      const res = await good.add(form)

      result(res).success((d, {data}) => {
        message.success(data.msg)
        // 浅拷贝清空表单
        Object.assign(addForm, defaultFormData)
        context.emit('getList')
      })
    }

    const close = () => {
      // 触发v-model双向绑定修改show
      context.emit('update:show', false)
    }

    return {
      addForm,
      submit,
      props,
      close,
      store: store.state,
    }
  }
})