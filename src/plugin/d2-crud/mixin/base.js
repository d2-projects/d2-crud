export default {
  props: {
    /**
     * @description 表格标题
     */
    title: {
      default: '',
    },
    /**
     * @description 表头数据
     */
    columns: {
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
      default: null,
    },
    /**
     * @description 多选
     */
    selectionRow: {
      type: Object,
      default: null,
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
      default: null,
    },
    /**
     * @description 表尾合计行
     */
    showSummary: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 合计计算方法
     */
    summaryMethod: {
      type: Function,
      default: null,
    },
  },
};
