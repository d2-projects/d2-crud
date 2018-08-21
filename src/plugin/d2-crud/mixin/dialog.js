import _forEach from 'lodash.foreach';
import _clonedeep from 'lodash.clonedeep';

export default {
  props: {
    /**
     * @description dialog配置
     */
    formOption: {
      type: Object,
      default: null,
    },
    /**
     * @description 表单模板
     */
    formTemplate: {
      type: Object,
      default: null,
    },
    /**
     * @description 表单校验规则
     */
    formRules: {
      type: Object,
      default: null,
    },
  },
  data() {
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
      formMode: 'edit',
    };
  },
  methods: {
    /**
     * @description 保存行数据
     */
    handleDialogSave() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        const rowData = {};
        if (this.formMode === 'edit') {
          _forEach(this.formData, (value, key) => {
            rowData[key] = value;
          });
          this.updateRow(this.editIndex, rowData);
          this.$emit('row-save', {
            index: this.editIndex,
            row: rowData,
          });
          this.closeDialog();
        } else if (this.formMode === 'add') {
          _forEach(this.formData, (value, key) => {
            rowData[key] = value;
          });
          this.addRow(rowData);
          this.$emit('row-add', rowData);
          this.closeDialog();
        }
      });
    },
    /**
     * @description 取消保存行数据
     */
    handleDialogCancel() {
      if (!this.rowHandle.edit.handleClose) {
        this.closeDialog();
      }
      this.$emit('dialog-cancel');
    },
    /**
     * @description 关闭模态框
     */
    closeDialog() {
      this.showDialog = false;
    },
  },
};
