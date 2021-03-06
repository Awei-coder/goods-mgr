import { defineComponent, reactive } from 'vue'
import { UserOutlined, LockOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { auth } from '@/service'


export default defineComponent({
  components: {
    // 图标组件注册
    UserOutlined,
    LockOutlined,
    MessageOutlined
  },
  setup() {

    // reactive对比ref, 它可以定义多个响应式数据
    const regForm = reactive({
      account: '',
      password: ''
    })

    // 处理注册逻辑
    const register = () => {
      // console.log(regForm);
      auth.register(regForm.account, regForm.password)
    }

    return {
      regForm,
      register
    }
  },
});