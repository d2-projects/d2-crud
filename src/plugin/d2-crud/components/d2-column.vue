<template>
  <div>
    <el-table-column
      v-for="(item, index) in columns"
      :prop="item.key ? item.key : ''"
      :label="item.title"
      :width="item.width ? item.width : ''"
      :fixed="item.fixed ? item.fixed : false"
      :key="index"
    >
      <d2-column v-if="item.children" :columns="item.children"></d2-column>
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: 'd2-column',
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>
