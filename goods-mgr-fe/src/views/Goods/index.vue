<template>
  <div>
    <a-card>
      <h2>商品列表</h2>

      <a-divider />

      <!-- 插槽接口 -->
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据商品名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
            style="width: 200px"
          />
          <a v-if="isSearch" href="javascript:;" @click="clearSearch"
            >清空搜索结果</a
          >
        </div>

        <a-button @click="show = true">添加一条</a-button>
      </space-between>

      <a-divider />

      <a-table :columns="columns" :data-source="list" :pagination="false">
        <template #manufactureDate="data">
          <!-- 格式化出厂日期 -->
          {{ formatTimeStamp(data.record.manufactureDate) }}
        </template>

        <!-- 删除按钮 -->
        <template #actions="data">
          <a href="javascript:;" @click="remove(data)">删除</a>
        </template>

        <!-- 库存信息 -->
        <template #count="data">
          <a href="javascript:;" @click="updateCount('IN_COUNT', data.record)">入库</a>
          {{ data.record.count }}
          <a href="javascript:;" @click="updateCount('OUT_COUNT', data.record)">出库</a>
        </template>
      </a-table>
      <space-between style="margin-top: 24px">
        <div></div>
        <a-pagination
          v-model:current="curpage"
          :total="total"
          :pageSize="10"
          @change="setPage"
        />
      </space-between>
      <!-- 双向绑定show, 子传父通过子传过来的值修改父的值 -->
      <add-one v-model:show="show" />
    </a-card>
  </div>
</template>

<script src="./index.jsx">
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>