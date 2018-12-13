export default {
  methods: {
    /**
     * @description 外部暴露的更新单元格数据方法
     */
    updateCell (rowIndex, key, value) {
      this.$set(this.d2CrudData, rowIndex, {
        ...this.d2CrudData[rowIndex],
        [key]: value
      })
    },
    /**
     * @description 外部暴露的新增行方法
     */
    addRow (row) {
      this.handleAddRow(row)
    },
    /**
     * @description 外部暴露的编辑行方法
     */
    updateRow (index, row) {
      this.handleUpdateRow(index, row)
    },
    /**
     * @description 外部暴露的删除行方法
     */
    removeRow (index) {
      this.handleRemoveRow(index)
    },
    /**
     * @description 外部暴露的打开模态框方法
     */
    showDialog (mode, rowIndex = null) {
      if (mode === 'edit') {
        if (!rowIndex) {
          return
        }
        this.handleEdit(rowIndex, this.d2CrudData[rowIndex])
      } else if (mode === 'add') {
        this.handleAdd()
      }
    },
    /**
     * @description 外部暴露的关闭模态框方法
     */
    closeDialog () {
      this.handleCloseDialog()
    }
  }
}
