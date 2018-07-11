export default {
  methods: {
    handleRemove(index, row) {
      this.$emit('row-remove', { index, row });
    },
  },
};
