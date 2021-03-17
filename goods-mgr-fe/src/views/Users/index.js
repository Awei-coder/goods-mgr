import { defineComponent, ref, onMounted, reactive } from 'vue'
import { user } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import { getCharacterInfoById } from '@/helpers/character'
import { message } from 'ant-design-vue'
import AddOne from './AddOne/index.vue'
import { EditOutlined } from '@ant-design/icons-vue'
import store from '@/store'

export default defineComponent({
  components: {
    AddOne,
    EditOutlined,
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
        title: '角色',
        slots: {
          customRender: 'character'
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
    const keyword = ref('')
    const isSearch = ref(false)
    const showEditCharacterModal = ref(false)
    const editForm = reactive({
      // 当前编辑的角色
      character: '',
      // 当前编辑的对象
      current: {}
    })

    // 获取用户列表
    const getUsers = async () => {
      const res = await user.list(curPage.value, 10, keyword.value)

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
    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })
    }

    // 点击搜索功能
    const onSearch = () => {
      console.log(keyword.value);
      // 如果搜索栏为空, !!keyword.value = !!'' = Boolean('') = false
      isSearch.value = !!keyword.value
      getUsers()
    }

    // 清空搜索功能
    const clearSearch = () => {
      keyword.value = ''
      isSearch.value = false
      getUsers()
    }

    // 点击编辑功能
    const onEdit = (record) => {
      editForm.current = record
      editForm.character = record.character
      showEditCharacterModal.value = true
    }

    // 更新角色功能
    const updateCharacter = async () => {
      const res = await user.editCharacter(editForm.character, editForm.current._id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          showEditCharacterModal.value = false
          // editForm.current 拿到的是record对象的引用, 而editForm.character是选择框选择的值
          // 用选择的值去更新前端
          editForm.current.character = editForm.character
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
      keyword,
      isSearch,
      onSearch,
      clearSearch,
      getCharacterInfoById,
      showEditCharacterModal,
      editForm,
      onEdit,
      characterInfo: store.state.characterInfo,
      updateCharacter,
    }
  }
})