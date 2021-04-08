import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import store from '@/store'
import { good } from '@/service'
import { message } from 'ant-design-vue'
import { result } from '@/helpers/utils'

export default defineComponent({
  setup() {
    // 获取分类
    const { goodClassifyList } = store.state
    const goodClassifyTitle = []
    goodClassifyList.forEach(item => {
      goodClassifyTitle.push(item.title)
    })

    // 显示数据
    const showEchart = function (goodClassifyTitle, total) {
      // 去除没有商品的分类
      total.forEach((item, index) => {
        if(item === 0) {
          goodClassifyList.splice(index, 1)
          total.splice(index, 1)
        }
      })

      const myChart = echarts.init(document.getElementById('main'));
      myChart.setOption({
        // title: {
        //   text: '分类库存详情'
        // },
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: [
          { left: 'center', top: 'center', width: '50%', height: '50%' },
        ],
        xAxis: {
          data: goodClassifyTitle
        },
        yAxis: {},
        series: [{
          name: '库存',
          type: 'bar',
          data: total,
        }],

      });
    }

    // 获取库存信息
    const getStore = async function () {
      const res = await good.getGoodStore()

      result(res)
        .success(({ data: total }) => {
          showEchart(goodClassifyTitle, total)
        })
    }

    onMounted(() => {
      getStore()

    })

    return {

    }
  }
})