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
      d2Data: [],
      /**
       * @description 表格当前分页数据
       */
      d2PaginationData: [],
      /**
       * @description 编辑暂存数据，用于储存不在formTemplate中的数据
       */
      editDataStorage: {}
    }
  },
  computed: {
    d2DataLength () {
      return this.d2Data.length
    }
  },
  watch: {
    data () {
      this.handleDataChange()
    },
    d2Data: {
      handler (val) {
        if (this.pagination) {
          this.d2PaginationData = this.d2Data.slice(this.paginationDataStart, this.paginationDataEnd)
        }
        this.$emit('d2-data-change', val)
      },
      deep: true
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
        if (this.pagination) {
          this.d2PaginationData = this.d2Data.slice(this.paginationDataStart, this.paginationDataEnd)
        }
      }
    },
    /**
     * @description 排序时数据变化
     */
    handleSortDataChange () {
      this.$nextTick(() => {
        if (this.pagination) {
          let j = 0
          for (let i = this.paginationDataStart; i < this.paginationDataEnd; i++) {
            this.d2Data[i] = this.$refs.elTable.store.states.data[j]
            j += 1
          }
        } else {
          this.d2Data = this.$refs.elTable.store.states.data
        }
      })
    },
    /**
     * @description 排序状态
     */
    handleSortChange ({ column, prop, order }) {
      this.handleSortDataChange()
      this.$emit('sort-change', { column, prop, order })
    },
    /**
     * @description 更新行数据
     * @param {Number} index 表格数据索引
     * @param {Object} row 更新的表格行数据
     */
    updateRow (index, row) {
      if (this.pagination) {
        this.$set(this.d2Data, index + this.paginationDataStart, row)
      } else {
        this.$set(this.d2Data, index, row)
      }
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 新增行数据
     * @param {Object} row 新增的表格行数据
     */
    addRow (row) {
      this.$set(this.d2Data, this.d2Data.length, row)
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    },
    /**
     * @description 删除行
     * @param {Object} index 被删除行索引
     */
    removeRow (index) {
      if (this.pagination) {
        this.$delete(this.d2Data, index + this.paginationDataStart)
      } else {
        this.$delete(this.d2Data, index)
      }
      if (this.defaultSort) {
        this.handleSortDataChange()
      }
    }
  }
}
