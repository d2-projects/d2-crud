export default {
  props: {
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
    };
  },
  methods: {
  },
};
