export default {
  methods: {
    /**
     * @description 上传
     */
    handleUploadProgress(event, index, row) {
      this.$emit('upload-progress', {
        index,
        loaded: event.loaded,
        total: event.total
      });
      console.log(event)
      this.handleUpdateRow(index, {
        ...row,
        d2UploadProgress: parseInt(event.loaded / event.total * 100)
      })
    },
    handleUploadSuccess(event, index, row) {
      this.$emit('upload-success', {
        index
      });
      console.log('handleUploadSuccess', event)
      this.handleUpdateRow(index, {
        ...row,
        d2UploadProgress: 0
      })
    },
    handleUploadError(event, index, row) {
      console.log('handleUploadError', event)
      this.$emit('upload-error', {
        index
      });
      this.handleUpdateRow(index, {
        ...row,
        d2UploadProgress: 0
      })
    }
  }
}
