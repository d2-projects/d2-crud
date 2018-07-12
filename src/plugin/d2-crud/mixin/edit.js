export default {
  methods: {
    handleEdit(index, row) {
      this.showDialog = true;
      this.editRowData = row;
    },
    handleEditSave() {
      this.showDialog = false;
    },
    handleEditCancel(done) {
    },
  },
};
