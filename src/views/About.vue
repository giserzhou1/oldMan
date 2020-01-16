<template>
 <div>
 <h1>消息列表</h1>
  <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="地理围栏！！！ " name="1">
    <div> 2020年1月15日，老人离开围栏</div>
  </el-collapse-item>
  <el-collapse-item title="心率！！！" name="2">
    <div>2020年1月15日，老人心率110，超出普通正常水平，应该重视</div>
  </el-collapse-item>
  <el-collapse-item title="运动量！！！" name="3">
    <div>2020年1月16日，老人步数超过一万步，运动量较大</div>
  </el-collapse-item>
  <el-collapse-item title="体温！！！ " name="4">
    <div>2020年1月20日，老人体温超过37.5摄氏度，高于正常水平</div>
  </el-collapse-item>
</el-collapse>
</div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange() {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .trip {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000;}
</style>