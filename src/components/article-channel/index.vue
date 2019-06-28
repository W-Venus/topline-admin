<template>
  <!-- el-select 组件有一个属性是value,用来绑定需要同步的数据
  el-select 有一个自定义change事件,当选中项发生改变时被触发,回调参数是选中项的value
  -->
  <el-select :value="value" @change="handleChange" clearable>
    <el-option
        v-for="item in channels"
        :key="item.id"
        :label="item.name"
        :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  // 组件传值
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channels: [] // 频道数据
    }
  },
  created () {
    // 请求频道数据
    this.loadChannels()
  },
  methods: {
    // 自定义事件
    handleChange (val) {
      this.$emit('input', val)
    },
    // 请求频道数据
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        //  console.log(channels)
        this.channels = data.channels
      } catch (err) {
        this.$message.error('请求错误')
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
