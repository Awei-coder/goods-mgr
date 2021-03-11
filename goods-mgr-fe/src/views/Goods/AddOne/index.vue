<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加书籍"
      @ok="submit"
      @cancel="close"
    >
      <!-- // 商品名
        name: String,
        // 价格
        price: Number,
        // 制造商
        manufacturer: String,
        // 出厂日期
        manufactureDate: String,
        // 分类
        classify: String,-->

      <a-form :label-col="{ span: 6 }">
        <a-form-item label="商品名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>

        <a-form-item label="价格">
          <a-input-number
            :min="0"
            :max="999999999999"
            v-model:value="addForm.price"
          />
        </a-form-item>

        <a-form-item label="制造商">
          <a-input v-model:value="addForm.manufacturer" />
        </a-form-item>

        <a-form-item label="出产日期">
          <a-date-picker v-model:value="addForm.manufactureDate" />
        </a-form-item>

        <a-form-item label="分类">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>

        <a-form-item label="库存">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'>
</script>

<style scoped>
</style>
