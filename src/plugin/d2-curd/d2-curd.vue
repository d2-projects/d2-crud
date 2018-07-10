<template>
  <div>
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :height="height"
      :max-height="maxHeight"
      :row-class-name="tableRowClassName"
      :highlight-current-row="highlightCurrentRow"
      :default-sort="defaultSort"
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
    >
      <!-- <d2-column :columns="columns"></d2-column> -->
      <el-table-column
        v-if="selectionRow.show"
        type="selection"
        :width="selectionRow.width"
        :fixed="selectionRow.fixed"
      >
      </el-table-column>
      <el-table-column
        v-if="indexRow.show"
        type="index"
        :width="indexRow.width"
        :fixed="indexRow.fixed">
      </el-table-column>
      <el-table-column
        v-for="(item, index) of columns"
        :prop="item.key ? item.key : ''"
        :label="item.title"
        :width="item.width ? item.width : ''"
        :fixed="item.fixed ? item.fixed : false"
        :show-overflow-tooltip="item.showOverflowTooltip ? item.showOverflowTooltip : false"
        :sortable="item.sortable ? item.sortable : false"
        :sort-method="item.sortMethod ? item.formatter : null"
        :sort-by="item.sortBy ? item.sortBy : null"
        :formatter="item.formatter ? item.formatter : null"
        :key="index"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="(item2, index2) in item.children"
            :prop="item2.key ? item2.key : ''"
            :label="item2.title"
            :width="item2.width ? item2.width : ''"
            :fixed="item2.fixed ? item2.fixed : false"
            :show-overflow-tooltip="item2.showOverflowTooltip ? item2.showOverflowTooltip : false"
            :sortable="item2.sortable ? item2.sortable : false"
            :sort-method="item2.sortMethod ? item2.formatter : null"
            :sort-by="item2.sortBy ? item2.sortBy : null"
            :formatter="item2.formatter ? item2.formatter : null"
            :key="index2"
          >
            <template v-if="item2.children">
              <el-table-column
                v-for="(item3, index3) in item2.children"
                :prop="item3.key ? item3.key : ''"
                :label="item3.title"
                :width="item3.width ? item3.width : ''"
                :fixed="item3.fixed ? item3.fixed : false"
                :show-overflow-tooltip="item3.showOverflowTooltip ? item3.showOverflowTooltip : false"
                :sortable="item3.sortable ? item3.sortable : false"
                :sort-method="item3.sortMethod ? item3.formatter : null"
                :sort-by="item3.sortBy ? item3.sortBy : null"
                :formatter="item3.formatter ? item3.formatter : null"
                :key="index3"
              >
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import d2Column from './components/d2-column.vue';

export default {
  name: 'd2Curd',
  components: {
    // d2Column,
  },
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
    /**
     * @description 表格最大高度
     */
    maxHeight: {
      type: String,
      default: 'auto',
    },
    /**
     * @description 索引
     */
    indexRow: {
      type: Object,
      default: () => ({
        show: false,
        width: '',
        fixed: false,
      }),
    },
    /**
     * @description 多选
     */
    selectionRow: {
      type: Object,
      default: () => ({
        show: false,
        width: '',
        fixed: false,
      }),
    },
    /**
     * @description 高亮选中行
     */
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 默认排序
     */
    defaultSort: {
      type: Object,
      default: () => ({}),
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
    handleCurrentChange(val) {
      this.$emit('current-change', val);
    },
    handleSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order });
    },
  },
};
</script>
