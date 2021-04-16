import { defineComponent, onMounted, ref } from 'vue'
import { dashboard } from '@/service'
import { result } from '@/helpers/utils'
import { useRouter } from 'vue-router'
import Notice from '@/views/Notice/index.vue'
import DaySaleValue from '@/views/OutInput/DaySaleValue/index.vue'
import DayStoreValue from '@/views/OutInput/DayStoreValue/index.vue'

export default defineComponent({
  components: {
    Notice,
    DaySaleValue,
    DayStoreValue,
  },
  setup() {
    const loading = ref(true)

    const baseInfo = ref({
      good: 0,
      toDayValueData: 0,
      toDayOutStock: 0,
    })

    const router = useRouter()

    const getBaseInfo = async () => {
      loading.value = true
      const res = await dashboard.baseInfo()
      loading.value = false

      result(res)
        .success(({ data }) => {
          baseInfo.value.good = data
        })
    }

    // 获得子组件传过来的值
    const getSaleDayValueData = (value) => {
      baseInfo.value.toDayValueData = value[4]
    }

    // 获得子组件传过来的值
    const getOutStock = (value) => {
      baseInfo.value.toDayOutStock = value[5]
    }

    // 前往公告
    const goNotice = () => {
      router.push('/notice/list')
    }

    onMounted(() => {
      getBaseInfo()
    })

    return {
      baseInfo,
      loading,
      getSaleDayValueData,
      getOutStock,
      goNotice,
    }
  }
})