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
    handlePaginationSizeChange (pageSize) {
      this.$emit('pagination-size-change', pageSize)
    },
    handlePaginationCurrentChange (currentPage) {
      this.$emit('pagination-current-change', currentPage)
    },
    handlePaginationPrevClick (currentPage) {
      this.currentPage = currentPage
      this.$emit('pagination-prev-click', currentPage)
    },
    handlePaginationNextClick (currentPage) {
      this.currentPage = currentPage
      this.$emit('pagination-next-click', currentPage)
    }
  }
}
