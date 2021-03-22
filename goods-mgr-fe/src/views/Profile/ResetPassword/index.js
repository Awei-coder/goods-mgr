import { defineComponent, reactive } from 'vue'
import { profile } from '@/service'
import { result } from '@/helpers/utils'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const form = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })

    const resetPassword = async () => {
      const {
        oldPassword,
        newPassword,
        confirmNewPassword,
      } = form
      if(newPassword !== confirmNewPassword) {
        message.error('密码不一致, 请重新输入！')
        return
      }

      const res = await profile.resetPassword(
        newPassword,
        oldPassword,
      )

      result(res)
        .success(({msg}) => {
          message.success(msg)

          form.oldPassword = ''
          form.newPassword = ''
          form.confirmNewPassword = ''
        })
    }

    return {
      form,
      resetPassword,
    }
  }
})