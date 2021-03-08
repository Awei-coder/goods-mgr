<template>
  <div>
    <a-card>
      <h2>商品列表</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search placeholder="根据商品名搜索" enter-button />
        </div>

        <a-button>添加一条</a-button>
      </space-between>
      
      <a-divider />

      <a-table :columns="columns" :data-source="dataSource">

      </a-table>


    </a-card>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
@import url(./index.scss);
</style>
