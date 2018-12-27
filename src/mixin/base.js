export default {
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * @description 表格加载
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表格加载配置
     */
    loadingOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表格配置
     */
    options: {
      type: Object,
      default: null
    },
    /**
     * @description 索引
     */
    indexRow: {
      default: null
    },
    /**
     * @description 多选
     */
    selectionRow: {
      default: null
    }
  },
  methods: {
    /**
     * @description 行选中状态
     */
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    /**
     * @description 勾选数据时触发的事件
     */
    handleSelect (selection, row) {
      this.$emit('select', selection, row)
    },
    /**
     * @description 勾选全选时触发的事件
     */
    handleSelectAll (selection) {
      this.$emit('select-all', selection)
    },
    /**
     * @description 复选框选择项发生变化时触发的事件
     */
    handleSelectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    /**
     * @description 单元格 hover 进入时触发的事件
     */
    handleCellMouseEnter (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    /**
     * @description 单元格 hover 退出时触发的事件
     */
    handleCellMouseLeave (row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    /**
     * @description 单元格点击时触发的事件
     */
    handleCellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    /**
     * @description 单元格双击时触发的事件
     */
    handleCellDblclick (row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    /**
     * @description 行点击时触发的事件
     */
    handleRowClick (row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    /**
     * @description 行右键点击时触发的事件
     */
    handleRowContextmenu (row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    /**
     * @description 行双击时触发的事件
     */
    handleRowDblclick (row, event) {
      this.$emit('row-dblclick', row, event)
    },
    /**
     * @description 表头点击时触发的事件
     */
    handleHeaderClick (column, event) {
      this.$emit('header-click', column, event)
    },
    /**
     * @description 表头右键点击时触发的事件
     */
    handleHeaderContextmenu (column, event) {
      this.$emit('header-contextmenu', column, event)
    }
  }
}
