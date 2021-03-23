<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共 {{ baseInfo.total.good }} 种</div>
            <div class="title">商品</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.user }} 位</div>
            <div class="title">用户</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.log }} 条</div>
            <div class="title">日志{{ simple }}</div>
          </div>
        </div>
      </a-card>
    </a-spin>

    <div class="table-list">
      <div class="left">
        <good
          simple
         />
      </div>

      <div class="right">
        <log 
        simple
        />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
