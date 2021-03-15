<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据用户名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
            style="width: 200px"
          />
          <a v-if="isSearch" href="javascript:;" @click="clearSearch"
            >清空搜索结果</a
          >
        </div>

        <a-button @click="showAddModal = true">添加用户</a-button>
      </space-between>

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
