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
      @selection-change="handleSelectionChange"
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
        :prop="item.key ? item.key : null"
        :label="item.title"
        :width="item.width ? item.width : null"
        :min-width="item.minWidth ? item.minWidth : null"
        :fixed="item.fixed ? item.fixed : false"
        :show-overflow-tooltip="item.showOverflowTooltip ? item.showOverflowTooltip : false"
        :sortable="item.sortable ? item.sortable : false"
        :sort-method="item.sortMethod ? item.formatter : null"
        :sort-by="item.sortBy ? item.sortBy : null"
        :formatter="item.formatter ? item.formatter : null"
        :filters="item.filters ? item.filters : null"
        :filter-method="item.filterMethod ? item.filterMethod : null"
        :filter-placement="item.filterPlacement ? item.filterPlacement : null"
        :key="index"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="(item2, index2) in item.children"
            :prop="item2.key ? item2.key : null"
            :label="item2.title"
            :width="item2.width ? item2.width : null"
            :min-width="item2.minWidth ? item2.minWidth : null"
            :fixed="item2.fixed ? item2.fixed : false"
            :show-overflow-tooltip="item2.showOverflowTooltip ? item2.showOverflowTooltip : false"
            :sortable="item2.sortable ? item2.sortable : false"
            :sort-method="item2.sortMethod ? item2.formatter : null"
            :sort-by="item2.sortBy ? item2.sortBy : null"
            :formatter="item2.formatter ? item2.formatter : null"
            :filters="item2.filters ? item2.filters : null"
            :filter-method="item2.filterMethod ? item2.filterMethod : null"
            :filter-placement="item2.filterPlacement ? item2.filterPlacement : null"
            :key="index2"
          >
            <template v-if="item2.children">
              <el-table-column
                v-for="(item3, index3) in item2.children"
                :prop="item3.key ? item3.key : null"
                :label="item3.title"
                :width="item3.width ? item3.width : null"
                :min-width="item3.minWidth ? item3.minWidth : null"
                :fixed="item3.fixed ? item3.fixed : false"
                :show-overflow-tooltip="item3.showOverflowTooltip ? item3.showOverflowTooltip : false"
                :sortable="item3.sortable ? item3.sortable : false"
                :sort-method="item3.sortMethod ? item3.formatter : null"
                :sort-by="item3.sortBy ? item3.sortBy : null"
                :formatter="item3.formatter ? item3.formatter : null"
                :filters="item3.filters ? item3.filters : null"
                :filter-method="item3.filterMethod ? item3.filterMethod : null"
                :filter-placement="item3.filterPlacement ? item3.filterPlacement : null"
                :key="index3"
              >
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleRemove(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import edit from './mixin/edit.js';
import remove from './mixin/remove.js'
// import d2Column from './components/d2-column.vue';

export default {
  name: 'd2Crud',
  mixins: [
    edit,
    remove,
  ],
  components: {
    // d2Column,
  },
  render(h) {
    return h('h1', 'lalala')
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
        width: null,
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
        width: null,
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
      return null;
    },
    /**
     * @description 行选中状态
     */
    handleCurrentChange(val) {
      this.$emit('current-change', val);
    },
    /**
     * @description 复选框选中转状态
     */
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    },
    /**
     * @description 排序状态
     */
    handleSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order });
    },
  },
};
</script>
