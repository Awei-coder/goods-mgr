<template>
  <div>
    <a-card
      title="公告"
      :headStyle="{
        'text-align': 'center',
        'font-weight': '700',
        'font-size': '24px',
      }"
    >
      <a-card>
        <flex-end>
          <a-button @click="show = true">添加</a-button>
          <a-button type="primary" id="update">编辑</a-button>
        </flex-end>
        <h2>
          公告标题
          <span>发布时间:</span>
        </h2>
        <p>公告内容</p>
      </a-card>

      <!-- 添加一条公告功能, 子传父通过子传过来的值修改父的值 -->
      <add-one v-model:show="show"></add-one>
    </a-card>
  </div>
</template>

<script src='./index.js'>
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
