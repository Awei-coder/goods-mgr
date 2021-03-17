import { defineComponent, ref, onMounted } from 'vue'
import menu from '@/config/menu'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const openKeys = ref([])
    const selectedKeys = ref([])

    onMounted(() => {
      selectedKeys.value = [route.path]
    })

    // 导航切换功能
    const to = (url) => {
      router.push(url)
    }

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    }
  }
})