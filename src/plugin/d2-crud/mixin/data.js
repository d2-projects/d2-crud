import clone from '../utils/clone';

export default {
  props: {
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
      /**
       * @description 表格内部数据
       */
      d2Data: [],
      /**
       * @description 表格内部数据展示层
       */
      d2DataView: [],
    };
  },
  watch: {
    data() {
      this.handleDataChange();
    },
  },
  mounted() {
    this.handleDataChange();
  },
  methods: {
    /**
     * @description 同步外部表格数据到d2Data内部
     */
    handleDataChange() {
      if (this.d2Data !== this.data) {
        this.d2Data = clone(this.data);
      }
    },
    /**
     * @description 排序状态
     */
    handleSortChange({ column, prop, order }) {
      this.$nextTick(() => {
        this.d2Data = this.$refs.elTable.store.states.data;
      });
      this.$emit('sort-change', { column, prop, order });
    },
    /**
     * @description 更新行数据
     * @param {Number} index 表格数据索引
     * @param {Object} row 更新的表格行数据
     */
    updateRow(index, row) {
      this.$set(this.d2Data, index, row);
      if (this.defaultSort) {
        this.$nextTick(() => {
          this.d2Data = this.$refs.elTable.store.states.data;
        });
      }
    },
  },
};
