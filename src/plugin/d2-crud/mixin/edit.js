import _forEach from 'lodash.foreach';
import clone from '../utils/clone';

export default {
  data() {
    return {
      editIndex: 0,
    };
  },
  methods: {
    handleEdit(index, row) {
      this.showDialog = true;
      this.editIndex = index;
      this.formData = clone(this.formTemplate);
      _forEach(this.formData, (value, key) => {
        this.formData[key].value = row[key];
      });
    },
    handleEditSave() {
      if (!this.rowHandle.edit.handleSave) {
        this.closeDialog();
      }
      this.$emit('edit-save');
    },
    handleEditCancel() {
      if (!this.rowHandle.edit.handleClose) {
        this.closeDialog();
      }
      this.$emit('edit-cancel');
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
