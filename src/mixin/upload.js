export default {
  methods: {
    /**
     * @description 上传
     */
    handleUploadProgress(index, row) {
      return (event, file, fileList) => {
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
      }
    },
    handleUploadSuccess(index, row) {
      return (event, file, fileList) => {
        this.$emit('upload-success', {
          index
        });
        console.log('handleUploadSuccess', event)
        this.$message.success('上传成功')
        this.handleUpdateRow(index, {
          ...row,
          d2UploadProgress: undefined
        })
      }
    },
    handleUploadError(index, row) {
      return (event, file, fileList) => {
        console.log('handleUploadError', event)
        this.$message.error('上传失败')
        this.$emit('upload-error', {
          index
        });
        this.handleUpdateRow(index, {
          ...row,
          d2UploadProgress: undefined
        })
      }
    }
  }
}
