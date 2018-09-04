import _clonedeep from 'lodash.clonedeep'
import _get from 'lodash.get'
import _set from 'lodash.set'

export default {
  props: {
    /**
     * @description 表格数据
     */
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      /**
       * @description 表格内部数据
       */
      d2Data: []
    }
  },
  watch: {
    data () {
      this.handleDataChange()
    },
    d2Data (val) {
      this.$emit('d2-data-change', val)
    }
  },
  mounted () {
    this.handleDataChange()
  },
  methods: {
    /**
     * @description lodash.get
     */
    _get,
    /**
     * @description lodash.set
     */
    _set,
    /**
     * @description 同步外部表格数据到d2Data内部
     */
    handleDataChange () {
      if (this.d2Data !== this.data) {
        this.d2Data = _clonedeep(this.data)
      }
    },
    /**
     * @description 排序状态
     */
    handleSortChange ({ column, prop, order }) {
      this.$nextTick(() => {
        this.d2Data = this.$refs.elTable.store.states.data
      })
      this.$emit('sort-change', { column, prop, order })
    },
    /**
     * @description 更新行数据
     * @param {Number} index 表格数据索引
     * @param {Object} row 更新的表格行数据
     */
    updateRow (index, row) {
      this.$set(this.d2Data, index, row)
      if (this.defaultSort) {
        this.$nextTick(() => {
          this.d2Data = _clonedeep(this.$refs.elTable.store.states.data)
        })
      }
    },
    /**
     * @description 新增行数据
     * @param {Object} row 新增的表格行数据
     */
    addRow (row) {
      this.$set(this.d2Data, this.d2Data.length, row)
      if (this.defaultSort) {
        this.$nextTick(() => {
          this.d2Data = this.$refs.elTable.store.states.data
        })
      }
    },
    /**
     * @description 删除行
     * @param {Object} index 被删除行索引
     */
    removeRow (index) {
      this.$delete(this.d2Data, index)
      if (this.defaultSort) {
        this.$nextTick(() => {
          this.d2Data = this.$refs.elTable.store.states.data
        })
      }
    }
  }
}
