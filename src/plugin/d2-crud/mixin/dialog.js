export default {
  props: {
    formTemplate: {
      type: Object,
      default: null,
    },
    formRules: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDialog: false,
      editRowData: {},
      formData: {},
    };
  },
  methods: {
  },
};
