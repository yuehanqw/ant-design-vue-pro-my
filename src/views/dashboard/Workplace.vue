<template>
  <div>工作台
    <a-button @click="jump">退出</a-button>
    {{ num }}
  </div>
</template>

<script>
import { postAction } from '@/api/api'

export default {
  data() {
    return {
      num: Math.random()
    }
  },
  methods: {
    jump() {
      postAction('api/user/router').then(res => {
        console.log(res)
        this.$forceUpdate()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
