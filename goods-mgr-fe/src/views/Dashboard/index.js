import { defineComponent, onMounted, ref } from 'vue'
import { dashboard } from '@/service'
import { result } from '@/helpers/utils'
import Good from '@/views/Goods/index.vue'
import Log from '@/views/Log/index.vue'

export default defineComponent({
  components: {
    Good,
    Log,
  },
  setup() {
    const loading = ref(true)

    const baseInfo = ref({
      total: {
        good: 0,
        user: 0,
        log: 0,
      }
    })

    const getBaseInfo = async () => {
      loading.value = true
      const res = await dashboard.baseInfo()
      loading.value = false

      result(res)
        .success(({data}) => {
          baseInfo.value = data
        })
    }

    onMounted(() => {
      getBaseInfo()
    })

    return {
      baseInfo,
      loading,
      Good,
      Log,
    }
  }
})