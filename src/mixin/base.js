export default {
  props: {
    /**
     * @description 表格标题
     */
    title: {
      default: ''
    },
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true
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
      type: Object,
      default: null
    },
    /**
     * @description 多选
     */
    selectionRow: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * @description 行选中状态
     */
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    /**
     * @description 复选框选中转状态
     */
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    }
  }
}
