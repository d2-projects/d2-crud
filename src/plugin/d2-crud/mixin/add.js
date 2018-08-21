import _forEach from 'lodash.foreach';
import _clonedeep from 'lodash.clonedeep';

export default {
  props: {
    /**
     * @description 是否显示新增按钮
     */
    addMode: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 新增按钮配置
     */
    addButton: {
      type: Object,
      default: null,
    },
  },
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd() {
      this.formMode = 'add';
      this.showDialog = true;
      this.formData = this.formTemplate ? _clonedeep(this.formTemplate) : {};
      _forEach(this.formData, (value, key) => {
        this.formData[key] = this.formTemplate[key].value;
      });
    },
  },
};
