import { defineComponent, onMounted, } from 'vue'
import * as echarts from 'echarts'
import store from '@/store'
import { inventoryLog } from '@/service'
import { result, } from '@/helpers/utils'
import { getTime, getSaleValueOption, } from '@/helpers/out-input'

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

    // 出库数据项目
    const outStockItems = []
    // 入库数据项目
    const inStockItems = []
    // 近期出库数据项目inventory-log -> 二维数组 存储近五天数据
    const accentOutStockItems = [[], [], [], [], []]
    // 近期出库数据项目inventory-log  -> 二维数组 存储近五天数据
    const accentInStockItems = [[], [], [], [], []]

    // 显示销售量数据
    const showValueEchart = function () {

      // 获取设置元素
      const showValue = echarts.init(document.getElementById('showDayStoreValue'));

      // vuex 保存每日出库量
      if(props.simple) {
        context.emit('getOutStock', outStock)
      }

      // 销售额数据配置
      const saleValueOption = getSaleValueOption(saleValueDate, inStock, outStock)

      // 保存配置
      showValue.setOption(saleValueOption);

      // 标志量, 用来记录是在分类总量还是具体分类里面
      // let classifyFlag = false

      // 当柱状图被点击的时候
      showValue.on('click', async function (params) {

        // 当前点击的图的index
        // console.log(params.name);
        // console.log(params.dataIndex);
        // console.log(params.seriesIndex)
        // console.log(params.seriesName);
        // console.log(totalItems);
        // console.log(accentOutStockItems);
        // console.log(accentInStockItems);

        // // 具体商品数量
        // const specificTotal = []
        // // 查询到的具体分类
        // const specificClassifyName = []
        // // 存放具体商品的数组
        // const specificName = []

        // // 获取所点击的每日具体商品方法
        // function getSpecifyItems(specificItems, index) {
        //   // 置空数组
        //   specificName.splice(0, specificName.splice)
        //   // 根据出入库id筛选出商品
        //   totalItems.forEach(item => {
        //     specificItems[index].forEach(value => {
        //       if (item._id === value.goodName) {
        //         // 深拷贝
        //         const tempItem = JSON.parse(JSON.stringify(item))
        //         // 把销量赋值给出入库数据
        //         tempItem.num = value.num
        //         specificName.push(tempItem)
        //       }
        //     })
        //   })
        // }

        // // 筛选
        // function getDayClassify(specificName) {
        //   // 临时存储筛选出的分类 -> 带销量
        //   const tempArr = []
        //   // 临时存储筛选出的分类 -> 不带销量
        //   const uniqueClassify = []
        //   // 筛选出入库的存在分类
        //   specificName.forEach(item => {
        //     goodClassifyList.forEach(value => {
        //       if (item.classify === value._id) {
        //         tempArr.push({
        //           title: value.title,
        //           num: item.num
        //         })
        //         uniqueClassify.push(value.title)
        //       }
        //     })
        //   })

        //   // 数组去重
        //   return {
        //     tempArr,
        //     uniqueClassify: uniqueArr(uniqueClassify),
        //   }
        // }

        // // 如果点击的是第一层
        // classifyFlag = saleValueDate.some(item => {
        //   return item === params.name
        // })

        // if (classifyFlag) {
        //   // 拉取下分类大全
        //   const saleGoodClassify = []
        //   // 获取总分类名字
        //   goodClassify(saleGoodClassify)

        //   if (params.seriesIndex === 0) {
        //     // 获取入库具体商品
        //     getSpecifyItems(accentInStockItems, params.dataIndex)

        //     // 临时存储筛选出的分类及销量
        //     const tempItems = getDayClassify(specificName)
        //     console.log(tempItems);

        //     // 真正的销售数据量 -> 不带重复的
        //     const realItems = []
        //     // 合并相同分类的量
        //     tempItems.uniqueClassify.forEach((item, index) => {
        //       let tempNum = 0
        //       tempItems.tempArr.forEach((value, i) => {
        //         if (item === value.title) {
        //           tempNum += value.num
        //         }
        //       })
        //       realItems.push(tempNum)
        //     })
        //     console.log(realItems);

        //     saleValueOption.dataset.source = [tempItems.uniqueClassify, realItems, realItems]
        //     // 保存配置
        //     showStore.setOption(saleValueOption);

        //     // 具体出入库的日志记录
        //     console.log(accentInStockItems[params.dataIndex]);
        //     // 具体出入库商品
        //     console.log(specificName);

        //   } else {
        //     // 获取出库具体商品
        //     getSpecifyItems(accentOutStockItems, params.dataIndex)

        //     // 具体出入库的日志记录
        //     console.log(accentOutStockItems[params.dataIndex]);
        //     // 具体出入库商品
        //     console.log(specificName);
        //   }

        // }

        // message.warn('当前分类不可再细分，请返回上一层！')
        // 如果在具体分类里面直接return
        return

      });

    }

    // 获取出入库信息√
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
      goodClassify(goodClassifyTitle)
      await getSaleValue()
      showValueEchart()
    })

    return {

    }
  }
})