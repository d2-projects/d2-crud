export default {
  props: {
    /**
     * @description 表格数据
     */
    pagination: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * @description 每页条数改变
     */
    handlePaginationSizeChange (pageSize) {
      this.$emit('pagination-size-change', pageSize)
    },
    /**
     * @description 当前页码改变
     */
    handlePaginationCurrentChange (currentPage) {
      this.$emit('pagination-current-change', currentPage)
    },
    /**
     * @description 上一页
     */
    handlePaginationPrevClick (currentPage) {
      this.$emit('pagination-prev-click', currentPage)
    },
    /**
     * @description 下一页
     */
    handlePaginationNextClick (currentPage) {
      this.$emit('pagination-next-click', currentPage)
    }
  }
}
