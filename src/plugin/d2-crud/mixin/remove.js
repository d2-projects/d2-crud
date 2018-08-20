export default {
  methods: {
    /**
     * @description 删除行
     */
    handleRemove(index, row) {
      if ((!('confirm' in this.rowHandle.remove)) || this.rowHandle.remove === true) {
        this.$confirm(this.handleAttribute(this.rowHandle.remove.text, '确定删除吗？'), this.handleAttribute(this.rowHandle.remove.title, '删除'), {
          confirmButtonText: this.handleAttribute(this.rowHandle.remove.confirmButtonText, '确定'),
          cancelButtonText: this.handleAttribute(this.rowHandle.remove.cancelButtonText, '取消'),
          type: this.handleAttribute(this.rowHandle.remove.type, 'error'),
        }).then(() => {
          this.removeRow(index);
          this.$emit('row-remove', row);
        });
      } else {
        this.removeRow(index);
        this.$emit('row-remove', row);
      }
    },
  },
};
