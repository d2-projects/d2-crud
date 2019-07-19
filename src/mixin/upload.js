export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleUploadProgress(event, index, row) {
      this.$emit('upload-progress', {
        index
      });
      this.handleUpdateRow(index, {
        ...row,
        d2UploadProgress: parseInt(event.loaded / event.total * 100)
      })
    },
    handleUploadSuccess(event, index, row) {
      this.$emit('upload-progress', {
        index
      });
      this.handleUpdateRow(index, {
        ...row,
        d2UploadProgress: 0
      })
    },
    handleUploadError(event, index, row) {
      this.$emit('upload-progress', {
        index
      });
      this.handleUpdateRow(index, {
        ...row,
        d2UploadProgress: 0
      })
    }
  }
}
