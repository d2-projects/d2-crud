import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  props: {
    /**
     * @description dialog配置
     */
    formOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表单模板
     */
    formTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 表单校验规则
     */
    formRules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      /**
       * @description dialog显示与隐藏
       */
      showDialog: false,
      /**
       * @description 表单数据
       */
      formData: {},
      /**
       * @description 表单模式
       */
      formMode: 'edit'
    }
  },
  methods: {
    /**
     * @description 保存行数据
     */
    handleDialogSave () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        let rowData = {}
        if (this.formMode === 'edit') {
          rowData = _clonedeep(this.editDataStorage)
          _forEach(this.formData, (value, key) => {
            this._set(rowData, key, value)
          })
          this.$emit('row-edit', {
            index: this.editIndex,
            row: rowData
          }, (param = null) => {
            if (param === false) {
              this.closeDialog()
              return
            }
            this.handleDialogSaveDone({
              ...rowData,
              ...param
            })
          })
        } else if (this.formMode === 'add') {
          _forEach(this.formData, (value, key) => {
            this._set(rowData, key, value)
          })
          this.$emit('row-add', rowData, (param = null) => {
            if (param === false) {
              this.closeDialog()
              return
            }
            this.handleDialogSaveDone({
              ...rowData,
              ...param
            })
          })
        }
      })
    },
    /**
     * @description 取消保存行数据
     */
    handleDialogCancel (done) {
      this.$emit('dialog-cancel', done)
    },
    /**
     * @description 保存完成
     */
    handleDialogSaveDone (rowData) {
      if (this.formMode === 'edit') {
        this.updateRow(this.editIndex, rowData)
        this.editDataStorage = {}
      } else if (this.formMode === 'add') {
        this.addRow(rowData)
      }
      this.closeDialog()
    },
    /**
     * @description 关闭模态框
     */
    closeDialog () {
      this.showDialog = false
    }
  }
}
