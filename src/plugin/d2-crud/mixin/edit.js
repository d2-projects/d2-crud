import _forEach from 'lodash.foreach';
import clone from '../utils/clone';

export default {
  data() {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0,
    };
  },
  methods: {
    /**
     * @description 编辑行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     */
    handleEdit(index, row) {
      this.showDialog = true;
      this.editIndex = index;
      this.formData = clone(this.rowHandle.edit.formTemplate ? this.rowHandle.edit.formTemplate : {});
      _forEach(this.formData, (value, key) => {
        this.formData[key].value = row[key];
      });
    },
    /**
     * @description 保存行数据
     */
    handleEditSave() {
      const rowData = {};
      _forEach(this.formData, (value, key) => {
        rowData[key] = value.value;
      });
      this.updateRow(this.editIndex, rowData);
      this.$emit('row-save', {
        index: this.editIndex,
        row: rowData,
      });
      if (!this.rowHandle.edit.handleSave) {
        this.closeDialog();
      }
    },
    /**
     * @description 取消保存行数据
     */
    handleEditCancel() {
      if (!this.rowHandle.edit.handleClose) {
        this.closeDialog();
      }
      this.$emit('edit-cancel');
    },
    /**
     * @description 关闭模态框
     */
    closeDialog() {
      this.showDialog = false;
    },
  },
};
