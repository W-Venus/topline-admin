<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM 容器-->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 引入
import echarts from 'echarts'
export default {
  name: 'fans',

  data () {
    return {
    }
  },
  async mounted () {
    // 异步加载数据
    const data = await this.$http('http://localhost:3000/eachartsData')
    // console.log(data)
    // 初始化图表实例
    var myChart = echarts.init(document.getElementById('main'))
    // 配置图表
    // 绘制图表
    // 显示标题，图例和空的坐标轴
    myChart.setOption({
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: data.categories
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: data.dataA
      }]
    })
  },
  methods: {}
}
</script>

<style lang='less' scoped>

</style>
