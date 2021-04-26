import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import store from '@/store'
import { good, inventoryLog } from '@/service'
import { result } from '@/helpers/utils'
import { getTime, getSaleDayValueOption } from '@/helpers/out-input'
import { message } from 'ant-design-vue'


export default defineComponent({
  props: {
    simple: Boolean,
  },

  setup(props, context) {

    // 获取分类数据
    const { goodClassifyList } = store.state
    const goodClassifyTitle = []

    // 获取具体分类名字方法
    function goodClassify(goodClassifyTitle) {
      goodClassifyList.forEach(item => {
        goodClassifyTitle.push(item.title)
      })
    }

    // 获取时间
    const saleValueDate = []
    // 出入库情况数组 -> 用来配置echarts
    let outStock = ['出库情况'], inStock = ['入库情况']
    // 保存全部商品变量
    let totalItems = []
    // 出库数据项目
    const outStockItems = []
    // 入库数据项目
    const inStockItems = []
    // 近期出库数据项目inventory-log -> 二维数组 存储近五天数据
    const accentOutStockItems = [[], [], [], [], []]
    // 近期出库数据项目inventory-log  -> 二维数组 存储近五天数据
    const accentInStockItems = [[], [], [], [], []]

    let showDayValue = null

    // 显示销售额数据
    const showDayValueEchart = function () {

      // 存放具体商品的数组 good-items
      const specificName = [[], [], [], [], []]

      // 获取每日具体商品方法
      function getSpecifyItems(specificItems) {
        // 置空数组
        specificName.forEach((item, index) => {
          specificName[index].splice(0, specificName[index].length)
        })
        // 根据出入库id筛选出商品 -> 看下数据就知道要三重
        totalItems.forEach(item => {
          specificItems.forEach((value, index) => {
            value.forEach((childValue) => {
              if (item._id === childValue.goodName) {
                // 深拷贝
                const tempItem = JSON.parse(JSON.stringify(item))
                // 把销量赋值给出入库数据
                tempItem.num = childValue.num
                specificName[index].push(tempItem)
              }
            })
          })
        })
      }

      // 获取每日商品
      getSpecifyItems(accentOutStockItems)

      // 最近五天出库的商品记录 inventory-log 
      // console.log(accentOutStockItems);

      // 最近五天出库的商品 item
      // console.log(specificName);

      const saleDayValueData = []

      // 计算每日营业额
      specificName.forEach((item, index) => {
        let totalNums = 0

        item.forEach(value => {
          totalNums += (value.num * value.price)
        })

        // 保留两位小数
        saleDayValueData.push(totalNums.toFixed(2))
      })


      // 拷贝数组
      const saleDatValueDate = saleValueDate.slice(0)

      // 弹出第一个数据字符串 'date'
      saleDatValueDate.shift()

      if (props.simple) {
        context.emit('getSaleDayValueData', saleDayValueData)
      }

      // 销售额数据配置
      const saleValueOption = getSaleDayValueOption(saleDatValueDate, saleDayValueData)

      // 保存配置
      showDayValue.setOption(saleValueOption)

      // 标志量, 用来记录是在分类总量还是具体分类里面
      let flag = false

      // 当柱状图被点击的时候 查询每日商品的具体销量情况
      showDayValue.on('click', async function (params) {

        // 查询当前分类是在总分类还是在具体分类里面, 如果是具体分类里面返回false
        flag = saleDatValueDate.some(item => {
          return item === params.name
        })

        if (flag) {
          // 每日出库商品总销量价格
          const specificDayTotal = []
          // 查询到的具体分类、ID和价格
          const specificDayName = []
          const specificDayID = []
          const specificDayPrice = []

          // 获取具体数据
          specificName[params.dataIndex].forEach(item => {
            // 如果商品名已经存在
            if(!specificDayName.some(value => value===item.name)) {
              specificDayName.push(item.name)
              specificDayID.push(item._id)
              specificDayPrice.push(item.price)
            }
          })

          // console.log(specificName[params.dataIndex]);
          // console.log(accentOutStockItems[params.dataIndex]);

          specificDayID.forEach((item, index) => {
            let num = 0
            accentOutStockItems[params.dataIndex].forEach(value => {
              if (value.goodName === item) {
                num += value.num
              }
            })
            specificDayTotal.push((num * specificDayPrice[index]).toFixed(1))
          })

          // console.log(specificDayTotal);
          // console.log(specificDayName);
          // console.log(specificDayPrice);

          // 具体销售商品数据配置
          const dayValueOption = getSaleDayValueOption(specificDayName, specificDayTotal)

          // 保存配置
          showDayValue.setOption(dayValueOption)

          return
        }

        message.warn('当前分类不可再细分，请返回上一层！')
        // 如果在具体分类里面直接return
        return

      });
    }

    // 获取出入库信息
    const getSaleValue = async function () {
      // 获取当前时间
      const nowTime = getTime(saleValueDate)

      const res = await inventoryLog.getSaleValue(nowTime.startTime, nowTime.endTime)

      result(res)
        .success(({ data }) => {
          // 处理近五天销量数据
          // console.log(data);

          // 置空数组
          outStockItems.splice(0, outStockItems.length)
          inStockItems.splice(0, inStockItems.length)
          accentOutStockItems.forEach((item, index) => {
            item.splice(0, item.length)
            accentInStockItems[index].splice(0, accentInStockItems[index].length)
          })
          // 保留第一位数据, 置空后面的数据
          outStock.splice(1, outStock.length)
          inStock.splice(1, inStock.length)


          for (let item of data) {
            // 判断该项目是出库还是入库
            if (item.type === 'OUT_COUNT') {
              outStockItems.push(item)
            } else {
              inStockItems.push(item)
            }
          }

          let tempOutStockNum = 0
          let tempInStockNum = 0
          // 五天的数据分别循环五次去拿
          for (let i = 0; i < 5; i++) {
            // 临时记录量的变量
            tempOutStockNum = 0
            tempInStockNum = 0

            // nowTime.startTime, nowTime.endTime 最近五天时间
            outStockItems.forEach(item => {
              if ((nowTime.startTime + i * nowTime.dayTime) <= item.meta.updatedAt && item.meta.updatedAt <= (nowTime.startTime + (i + 1) * nowTime.dayTime)) {
                tempOutStockNum += item.num
                // 存储近五天的数据
                accentOutStockItems[i].push(item)
              }
            })
            inStockItems.forEach(item => {
              if ((nowTime.startTime + i * nowTime.dayTime) <= item.meta.updatedAt && item.meta.updatedAt <= (nowTime.startTime + (i + 1) * nowTime.dayTime)) {
                tempInStockNum += item.num
                // 存储近五天的数据
                accentInStockItems[i].push(item)
              }
            })

            // 存储每日出入库量
            outStock.push(tempOutStockNum)
            inStock.push(tempInStockNum)

          }

        })
    }

    // 实例挂载时载入信息
    onMounted(async () => {
      // 获取设置元素
      showDayValue = echarts.init(document.getElementById('showDaySaleValue'));
      const { data: { data: { list } } } = await good.list()
      totalItems = list
      goodClassify(goodClassifyTitle)
      await getSaleValue()
      showDayValueEchart()
    })

    onUnmounted(() => {
      if (showDayValue) {
        showDayValue.dispose()
      }
    })

    return {

    }
  }
})