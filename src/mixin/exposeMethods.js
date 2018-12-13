export default {
  methods: {
    /**
     * @description 外部暴露的更新单元格数据方法
     */
    crudUpdateCell (rowIndex, key, value) {
      this.$set(this.d2CrudData, rowIndex, {
        ...this.d2CrudData[rowIndex],
        [key]: value
      })
    },
    /**
     * @description 外部暴露的新增行方法
     */
    crudAddRow (row) {
      this.addRow(row)
    },
    /**
     * @description 外部暴露的编辑行方法
     */
    crudUpdateRow (index, row) {
      this.updateRow(index, row)
    },
    /**
     * @description 外部暴露的删除行方法
     */
    crudRemoveRow (index) {
      this.removeRow(index)
    },
    /**
     * @description 外部暴露的触发模态框方法
     */
    crudShowDialog (mode, rowIndex = null) {
      if (mode === 'edit') {
        if (!rowIndex) {
          return
        }
        this.handleEdit(rowIndex, this.d2CrudData[rowIndex])
      } else if (mode === 'add') {
        this.handleAdd()
      }
    }
  }
}
