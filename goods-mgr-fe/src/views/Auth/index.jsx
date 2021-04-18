import { defineComponent, reactive, ref } from 'vue'
import { UserOutlined, LockOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { auth, resetPassword } from '@/service'
import { message, Modal, Input } from 'ant-design-vue';
import { result } from '@/helpers/utils'
import msConfig from '@/helpers/utils/messageConfig'
import store from '@/store'
import { getCharacterInfoById } from '@/helpers/character'
import { useRouter } from 'vue-router'
import { setToken } from '@/helpers/token'
import JcRange from "@/views/Auth/SliderCheck/index.vue";

export default defineComponent({
  components: {
    // 图标组件注册
    UserOutlined,
    LockOutlined,
    MessageOutlined,
    JcRange,
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

    // 滑动验证参数
    const sliderCode = ref(false)

    // 忘记密码功能
    const forgetPassword = () => {
      Modal.confirm({
        title: `请输入账号，提交给管理员审核`,
        content: (
          <div>
            <Input class="__forget_password_account" />
          </div>
        ),

        // 确定按钮
        onOk: async () => {
          const el = document.querySelector('.__forget_password_account')
          let account = el.value

          const res = await resetPassword.add(account)

          result(res)
            .success(({msg}) => {
              message.success(msg)
            })
        }
      })
    }

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
        .success((data) => {
          message.success(data.msg)
          // 置空表格
          Object.keys(regForm).forEach(key => {
            regForm[key] = ''
          })
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

      // 如果用户没进行滑动验证
      if(!sliderCode.value) {
        message.error('请先进行人机验证操作！')
        return
      }

      // 发送axios请求  返回的res是一个response对象
      const res = await auth.login(loginForm.account, loginForm.password)
      // 处理axios返回逻辑
      result(res)
        .success(async ({ msg, data: { user, token } }, response) => {
          message.success(msg)

          // 设置token
          setToken(token)
          
          // 获取角色列表
          await store.dispatch('getCharacterInfo')

          // 设置登陆用户的状态
          store.commit('setUserInfo', user)

          // 设置用户角色
          store.commit('setUserCharacter', getCharacterInfoById(user.character))

          // 进入页面
          router.replace('/dashboard')

        })
      // 这里类似传过去一个函数 然后在那边(data,response){message.success(data.msg)} (data, response) 传回来调用了

    }

    // 滑动验证成功函数
    const onMpanelSuccess = () =>{
      sliderCode.value = true
    }

    // 滑动验证失败函数
    const onMpanelError = () =>{
      sliderCode.value = false
    }

    return {
      // 注册数据和方法
      regForm,
      register,

      // 登录数据和方法
      loginForm,
      login,

      // 忘记密码
      forgetPassword,
      onMpanelSuccess,
      onMpanelError,
      sliderCode,
    }
  },
});

// ant-design-vue配置
msConfig()