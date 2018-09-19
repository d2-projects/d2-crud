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
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    pageSize () {
      return this.pagination.pageSize || 10
    },
    paginationDataStart () {
      return (this.currentPage - 1) * this.pageSize
    },
    paginationDataEnd () {
      return this.currentPage * this.pageSize
    }
  },
  watch: {
    currentPage: {
      handler (val) {
        if (this.pagination) {
          this.d2PaginationData = this.d2Data.slice(this.paginationDataStart, this.paginationDataEnd)
        }
      }
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
      this.currentPage = currentPage
      this.$emit('pagination-prev-click', currentPage)
    },
    /**
     * @description 下一页
     */
    handlePaginationNextClick (currentPage) {
      this.currentPage = currentPage
      this.$emit('pagination-next-click', currentPage)
    }
  }
}
