<template>
  <div>
    <!-- loading效果 -->
    <a-spin :spinning="loading">
      <a-card>
        <h2>操作日志</h2>

        <a-divider />

        <div>
          <a-table
            bordered
            :columns="columns"
            :data-source="list"
            :pagination="false"
          >
          </a-table>
        </div>

        <flex-end style="margin-top: 24px">
          <a-pagination
            v-model:value="curPage"
            :pageSize="20"
            :total="total"
            @change="setPage"
          />
        </flex-end>
      </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>

<style scoped>
</style>
