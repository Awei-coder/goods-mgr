<template>
  <div>
    <a-card>
      <h2>商品列表</h2>

      <a-divider />

      <!-- 插槽接口 -->
      <space-between>
        <div class="search">
          <a-input-search placeholder="根据商品名搜索" enter-button />
        </div>

        <a-button @click="show = true">添加一条</a-button>
      </space-between>

      <a-divider />

      <a-table :columns="columns" :data-source="list" :pagination="false">
        <template #manufactureDate="data">
          {{formatTimeStamp(data.record.manufactureDate)}} 
        </template>
      </a-table>
      <space-between style="margin-top: 24px;">
        <div></div>
        <a-pagination
        v-model:current="curpage" 
        :total="total"
        :pageSize = "10"
        @change="setPage"
         />
      </space-between>
      <!-- 双向绑定show, 子传父通过子传过来的值修改父的值 -->
      <add-one v-model:show="show" />
    </a-card>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
@import url(./index.scss);
</style>
