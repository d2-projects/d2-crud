export default {
  methods: {
    handleSave(index, row) {
      this.$emit('row-save', { index, row });
    },
  },
};
