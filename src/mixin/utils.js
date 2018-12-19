export default {
  methods: {
    /**
     * @description 组件属性默认值
     */
    handleAttribute (attribute, defaultValue) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      return attribute || defaultValue
    },
    /**
     * @description 根据dialog模式渲染不同表单
     */
    handleFormTemplateMode (key) {
      if (this.formMode === 'edit') {
        return this.editTemplateStorage[key]
      } else if (this.formMode === 'add') {
        return this.addTemplateStorage[key]
      }
    }
  }
}
