<template>
  <div>
    <a-card>
      <h2>公告</h2>
      <a-divider></a-divider>
      <flex-end>
        <a-button @click="show = true">添加</a-button>
        <a-button type="primary" id="update">编辑</a-button>
      </flex-end>
      <a-divider></a-divider>

      <!-- 添加一条公告功能, 子传父通过子传过来的值修改父的值 -->
      <add-one v-model:show="show"></add-one>
    </a-card>
  </div>
</template>

<script src='./index.js'>
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
