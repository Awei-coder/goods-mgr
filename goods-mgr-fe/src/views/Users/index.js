import { defineComponent, ref, onMounted } from 'vue'
import { user } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import AddOne from './AddOne/index.vue'

export default defineComponent({
  components: {
    AddOne
  },

  setup() {

    // 用户数据展示
    const columns = [
      {
        title: '用户名',
        dataIndex: 'account',
      },
      {
        title: '注册时间',
        slots: {
          customRender: 'createdAt'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      },
    ]

    // 定义变量
    const list = ref([])
    const total = ref(0)
    const curPage = ref(1)
    const showAddModal = ref(false)

    // 获取用户列表
    const getUsers = async () => {
      const res = await user.list(curPage.value, 10)

      result(res)
        .success(({ data: { list: resList, total: resTotol } }) => {
          list.value = resList
          total.value = resTotol
        })
    }

    // 当组件挂载完
    onMounted(() => {
      getUsers()
    })

    // 删除用户方法
    const remove = async ({ _id }) => {
      const res = await user.remove(_id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          getUsers()
        })
    }

    // 设置页码切换
    const setPage = (page) => {
      curPage.value = page
      
      getUsers()
    }

    // 重置密码功能
    const resetPassword = async ({_id}) => {
      const res = await user.resetPassword(_id)

      result(res)
        .success(({msg}) => {
          message.success(msg)
        })
    }

    return {
      curPage,
      list,
      curPage,
      columns,
      formatTimeStamp,
      remove,
      showAddModal,
      getUsers,
      setPage,
      total,
      resetPassword,
    }
  }
})