<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider></a-divider>

      <a-button @click="showAddModal = true">添加用户</a-button>

      <a-divider></a-divider>

      <div>
        <a-table
          bordered
          :pagination="false"
          :data-source="list"
          :columns="columns"
        >
          <template #createdAt="{ record }">
            {{ formatTimeStamp(record.meta.createdAt) }}
          </template>

          <template #actions="{ record }">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a>
            &nbsp;
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>

        <flex-end style="margin-top: 24px">
          <a-pagination
            v-model:current="curPage"
            :total="total"
            :pageSize="10"
            @change="setPage"
          ></a-pagination>
        </flex-end>
      </div>
      <add-one v-model:show="showAddModal" @getList="getUsers" />
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
