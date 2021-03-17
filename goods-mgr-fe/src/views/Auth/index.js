import { defineComponent, reactive } from 'vue'
import { UserOutlined, LockOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { auth } from '@/service'
import { message } from 'ant-design-vue';
import { result } from '@/helpers/utils'
import msConfig from '@/helpers/utils/messageConfig'
import store from '@/store'
import { getCharacterInfoById } from '@/helpers/character'
import {useRouter} from 'vue-router'
import {setToken} from '@/helpers/token'

export default defineComponent({
  components: {
    // 图标组件注册
    UserOutlined,
    LockOutlined,
    MessageOutlined
  },
  setup() {

    const router = useRouter()

    // reactive对比ref, 它可以定义多个响应式数据
    // 注册表单
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: ''
    })

    // 登录表单
    const loginForm = reactive({
      account: '',
      password: ''
    })

    // 处理注册逻辑函数
    const register = async () => {

      // console.log(regForm);
      // 前端表单基本判断
      if (regForm.account === '') {
        message.warning('请输入账户')
        return
      }
      if (regForm.password === '') {
        message.warning('请输入密码')
        return
      }
      if (regForm.inviteCode === '') {
        message.warning('请输入邀请码')
        return
      }

      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode)
      // 处理axios返回逻辑
      result(res)
        .success((data, response) => {
          message.success(data.msg)
        })

    }

    // 处理登录逻辑函数
    const login = async () => {

      // 前端表单基本判断
      if (loginForm.account === '') {
        message.warning('请输入账户')
        return
      }
      if (loginForm.password === '') {
        message.warning('请输入密码')
        return
      }

      // 发送axios请求  返回的res是一个response对象
      const res = await auth.login(loginForm.account, loginForm.password)
      // 处理axios返回逻辑
      result(res)
        .success(({ msg, data: { user, token } }, response) => {
          message.success(msg)

          // 设置登陆用户的状态
          store.commit('setUserInfo', user)

          // 设置用户角色
          store.commit('setUserCharacter', getCharacterInfoById(user.character))

          // 设置token
          setToken(token)

          // 进入页面
          router.replace('/goods')
          
        })
      // 这里类似传过去一个函数 然后在那边(data,response){message.success(data.msg)} (data, response) 传回来调用了

    }

    return {
      // 注册数据和方法
      regForm,
      register,

      // 登录数据和方法
      loginForm,
      login,

    }
  },
});

// ant-design-vue配置
msConfig()