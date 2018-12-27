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
     * @description dialog新增标题
     */
    addTitle: {
      type: String,
      default: '添加'
    },
    /**
     * @description dialog修改标题
     */
    editTitle: {
      type: String,
      default: '编辑'
    },
    /**
     * @description 新增表单模板
     */
    addTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 修改表单模板
     */
    editTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 新增表单校验规则
     */
    addRules: {
      type: Object,
      default: null
    },
    /**
     * @description 编辑表单校验规则
     */
    editRules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      /**
       * @description dialog显示与隐藏
       */
      isDialogShow: false,
      /**
       * @description 表单数据
       */
      formData: {},
      /**
       * @description 表单模式
       */
      formMode: 'edit',
      /**
       * @description 编辑暂存数据，用于储存不在editTemplate中的数据
       */
      editDataStorage: {},
      /**
       * @description 新增表单模板暂存
       */
      addTemplateStorage: {},
      /**
       * @description 修改表单模板暂存
       */
      editTemplateStorage: {}
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
              this.handleCloseDialog()
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
              this.handleCloseDialog()
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
        this.handleUpdateRow(this.editIndex, rowData)
        this.editDataStorage = {}
      } else if (this.formMode === 'add') {
        this.handleAddRow(rowData)
      }
      this.handleCloseDialog()
    },
    /**
     * @description 关闭模态框
     */
    handleCloseDialog () {
      this.isDialogShow = false
    }
  }
}
