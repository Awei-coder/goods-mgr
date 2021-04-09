import { defineComponent, ref } from 'vue'
import AddOne from './AddOne/index.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    AddOne,
  },
  setup() {

    // 显示隐藏添加公告表单变量
    const show = ref(false)
    return {
      show,

    }
  }
})