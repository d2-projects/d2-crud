<template>
  <div>
    <el-table
      :data="data">
      <el-table-column
        v-for="(item, index) of columns"
        :prop="item.key"
        :label="item.title"
        :width="item.width ? item.width : ''"
        :key="index">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'd2Curd',
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true,
    },
    /**
     * @description 表格数据
     */
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>
