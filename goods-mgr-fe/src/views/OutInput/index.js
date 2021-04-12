import { defineComponent, onMounted, } from 'vue'
import * as echarts from 'echarts'
import store from '@/store'
import { good, inventoryLog } from '@/service'
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
    // 获取时间
    const saleValueDate = []
    // 出入库情况数组 -> 用来配置echarts
    let outStock = ['出库情况'], inStock = ['入库情况']
    // 出库数据项目
    const outStockItems = []
    // 入库数据项目
    const inStockItems = []

    // 显示销售额数据
    const showValueEchart = function () {

      // 获取设置元素
      const showStore = echarts.init(document.getElementById('showValue'));

      // echarts配置
      const saleValueOption = {
        title: {
          text: '出入库情况表'
        },
        legend: {},
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
        dataset: {
          source: [
            saleValueDate,
            inStock,
            outStock,
          ]
        },
        xAxis: [
          { type: 'category', gridIndex: 0 },
        ],
        yAxis: [
          { gridIndex: 0 },
        ],
        grid: [
          { left: 'center', top: 'center', width: '50%', height: '50%' },
        ],
        series: [
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'black',
                  }
                }
              }
            }
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: 'black',
                  }
                }
              }
            }
          },
        ]
      }

      // 保存配置
      showStore.setOption(saleValueOption);

      // 标志量, 用来记录是在分类总量还是具体分类里面
      let flag = false

      // 当柱状图被点击的时候
      showStore.on('click', async function (params) {

        // 当前点击的图的index
        console.log(params.name);
        console.log(params.dataIndex);
        console.log(params.seriesIndex)
        console.log(params.seriesName);

        message.warn('当前分类不可再细分，请返回上一层！')
        // 如果在具体分类里面直接return
        return

      });

    }

    // 显示库存数据
    const showStoreEchart = function (goodClassifyTitle, total) {
      // 去除没有商品的分类
      // total.forEach((item, index) => {
      //   if (item === 0) {
      //     goodClassifyList.splice(index, 1)
      //     total.splice(index, 1)
      //   }
      // })

      for (let i = 0; i < total.length; i++) {

        if (total[i] === 0) {
          goodClassifyTitle.splice(i, 1)
          total.splice(i, 1)
          i -= 1
        }
      }

      // 获取设置元素
      const showStore = echarts.init(document.getElementById('showStore'));

      // echarts配置
      const storeOption = {
        title: {
          text: '分类库存详情'
        },
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
          itemStyle: {
            normal: {
              //设置颜色
              color: function (params) {
                var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                return colorList[params.dataIndex]
              },
              // 设置上标数值显示
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black',
                }
              },
            }
          }
        }],
      }

      // 保存配置
      showStore.setOption(storeOption);

      // 标志量, 用来记录是在分类总量还是具体分类里面
      let flag = false

      // 当柱状图被点击的时候
      showStore.on('click', async function (params) {
        // 具体商品数量
        const specificTotal = []
        // 查询到的具体分类
        const specificName = []

        // 当前点击的图的index
        // console.log(params.dataIndex)
        // console.log(params.name);

        // 查询当前分类是在总分类还是在具体分类里面, 如果是具体分类里面返回false
        flag = goodClassifyList.some(item => {
          return item.title === params.name
        })

        // 获取点击分类的id
        let _id = ''
        if (flag) {
          // 获取到当前点击的元素
          const one = goodClassifyList.find(item => {
            return item.title === params.name
          })
          _id = one._id
          // 根据分类id查询商品
          const res = await good.list({
            _id
          })
          result(res)
            .success(({ data: { list: l } }) => {
              // 置空
              // 遍历数据, 记录分类和数量
              l.forEach(item => {
                specificName.push(item.name)
                specificTotal.push(item.count)
              })

              // 配置图
              storeOption.xAxis.data = specificName
              storeOption.series[0].data = specificTotal

            })

          // 保存配置
          showStore.setOption(storeOption)

          return
        }

        message.warn('当前分类不可再细分，请返回上一层！')
        // 如果在具体分类里面直接return
        return

      });

    }

    // 获取库存信息
    const getStore = async function () {
      const res = await good.getGoodStore()

      result(res)
        .success(({ data: total }) => {
          showStoreEchart(goodClassifyTitle, total)
        })
    }

    // 获取出入库信息
    const getSaleValue = async function () {
      // 获取当前时间
      const nowTime = getTime()
      const res = await inventoryLog.getSaleValue(nowTime.startTime, nowTime.endTime)

      result(res)
        .success(({ data }) => {
          // 处理近五天销量数据
          // console.log(data);

          // 置空数组
          outStockItems.splice(0, outStockItems.length)
          inStockItems.splice(0, inStockItems.length)
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
              }
            })
            inStockItems.forEach(item => {
              if ((nowTime.startTime + i * nowTime.dayTime) <= item.meta.updatedAt && item.meta.updatedAt <= (nowTime.startTime + (i + 1) * nowTime.dayTime)) {
                tempInStockNum += item.num
              }
            })

            // 存储每日出入库量
            outStock.push(tempOutStockNum)
            inStock.push(tempInStockNum)

          }

        })
    }

    // 获取时间
    function getTime() {
      let startTime = 0
      let endTime = 0

      const date = new Date()
      const newDate = []
      let newDateStr = ''
      // 获取年
      newDate.push(date.getFullYear())
      // 获取月
      newDate.push(date.getMonth() + 1)
      // 获取月, 往前推一天
      newDate.push(date.getDate() + 1)
      // 组合时间
      newDateStr = newDate.join('-')
      // 深拷贝数组 以便后面作五天时间分组
      let tempArr = newDateStr
      saleValueDate.splice(0, saleValueDate.length)

      // 加上时分秒, 否则默认是八点开始的
      newDateStr += ' 00:00:00'
      // 一天的时长 毫秒数
      const dayTime = 86400000

      // 明天的零点
      endTime = new Date(newDateStr).getTime()
      // 五天前的零点
      startTime = (new Date(newDateStr).getTime() - dayTime * 5)

      for (let i = 0; i < 5; i++) {
        let newtempArr = tempArr.split('-')
        newtempArr[newtempArr.length - 1] -= 1
        tempArr = newtempArr.join('-')
        saleValueDate.unshift(tempArr)
      }
      saleValueDate.unshift('date')
      return {
        startTime,
        endTime,
        dayTime,
      }
    }

    // 实例挂载时载入信息
    onMounted(async () => {
      getStore()
      await getSaleValue()
      showValueEchart()
    })

    return {

    }
  }
})