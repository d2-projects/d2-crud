<template>
  <div>
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :height="height"
      :max-height="maxHeight"
      :row-class-name="tableRowClassName">
      <el-table-column
        v-for="(item, index) of columns"
        :prop="item.key"
        :label="item.title"
        :width="item.width ? item.width : ''"
        :fixed="item.fixed ? item.fixed : false"
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
    /**
     * @description 斑马纹
     */
    stripe: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 边框
     */
    border: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 表格高度
     */
    height: {
      type: String,
      default: 'auto',
    },
    maxHeight: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
    };
  },
  methods: {
    /**
     * @description 表格状态
     */
    tableRowClassName({ row }) {
      if (row.rowControl) {
        return row.rowControl.rowClassName;
      }
      return '';
    },
  },
};
</script>
