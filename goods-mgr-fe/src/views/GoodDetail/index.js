import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { good, inventoryLog } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import Update from '@/views/Goods/Update/index.vue'
import { CheckOutlined } from '@ant-design/icons-vue'


export default defineComponent({
  // 注册编辑路由组件
  components: {
    Update,
    CheckOutlined,
  },
  setup() {
    // 表示当前页面跟路由的相关信息 比如url参数 params参数
    const route = useRoute()
    const router = useRouter()
    // 获取url上的id
    const { id } = route.params
    // 定义当前详情页变量
    const detailInfo = ref({})

    // 显示编辑路由组件
    const showUpdateModal = ref(false)

    // 出入库变量
    const log = ref([])
    const logTotal = ref(0)
    const logCurPage = ref(1)
    // 当前显示的是出库还是入库的日志
    const curLogType = ref('IN_COUNT')

    // 进出库显示数据
    const columns = [
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '操作时间',
        slots: {
          customRender: 'createdAt'
        }
      },
    ]

    // 获取服务端传过来的数据 获取商品详情信息
    const getDetail = async (id) => {
      const res = await good.detail(id)

      result(res)
        .success(({ data }) => {
          detailInfo.value = data
        })
    }

    
    // 获取出入库日志
    const getInventoryLog = async () => {
      const res = await inventoryLog.list(curLogType.value, logCurPage.value, 10)

      result(res)
        .success(({data: {list, total}}) => {
          log.value = list
          logTotal.value = total
        })
    }

    // 当组件比加载完毕之后
    onMounted(() => {
      getDetail(id)
      getInventoryLog()
    })

    // 日志设置页码 分页切换的时候
    const setLogPage = (page) => {
      logCurPage.value = page
      getInventoryLog()
    }
    // 筛选日志
    const logFilter = (type) => {
      curLogType.value = type

      getInventoryLog()
    }

    const remove = async () => {
      // 发送删除请求
      const res = await good.remove(id)

      result(res)
        .success(({ msg }) => {
          // 提示删除成功
          message.success(msg)
          // 页面跳转回上一层
          router.replace('/goods')
        })
    }

    // 更新商品
    const updateGood = (newData) => {
      Object.assign(detailInfo.value, newData)
    }

    return {
      d: detailInfo,
      formatTimeStamp,
      remove,
      showUpdateModal,
      updateGood,
      log,
      logTotal,
      logCurPage,
      setLogPage,
      columns,
      logFilter,
      curLogType,
    }
  }
})