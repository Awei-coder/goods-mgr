import { defineComponent, reactive, onMounted } from 'vue'
import { result, clone} from '@/helpers/utils'

const defaultFormData = {
  title: '',
  content: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },

  setup(props) {
    const addForm = reactive(clone(defaultFormData))

    const submit = () => {}
    const close = () => {}

    return {
      submit,
      close,
      props,
      addForm,
    }
  }
})