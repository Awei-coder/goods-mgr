import { defineComponent, ref, onMounted } from 'vue'
import addOne from './AddOne/index.vue'
import { good } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'

export default defineComponent({
  components: {
    addOne
  },
  setup() {
    const columns = [
      {
        title: '商品名',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '制造商',
        dataIndex: 'manufacturer',
      },
      {
        title: '出厂日期',
        dataIndex: 'manufactureDate',
        slots: {
          customRender: 'manufactureDate',
        },
      },
      {
        title: '分类',
        dataIndex: 'classify',
      },
    ]

    // 显示隐藏表单变量
    const show = ref(false)

    const list = ref([])

    // 获取服务端传过来的数量
    const total = ref(0)

    // 创建当前页变量
    const curpage = ref(1)
    
    // 抽离获取商品方法
    const getList = async () => {
      const res = await good.list({
        page: curpage.value,
        size: 10,
      })

      result(res)
        .success(({ data: {list: l, total: t} }) => {
          list.value = l
          total.value = t
        })
    }

    // 列出商品
    onMounted(async () => {
      getList();
    })

    // 点击当前页面
    const setPage = (page) => {
      curpage.value = page

      getList()
    }

    return {
      columns,
      show,
      list,
      formatTimeStamp,
      curpage,
      total,
      setPage,
    }
  }
})