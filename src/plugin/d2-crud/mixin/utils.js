import _forEach from 'lodash.foreach';

export default {
  methods: {
    /**
     * @description 组件属性默认值
     */
    handleAttribute(attribute, defaultValue) {
      return attribute || defaultValue;
    },
  },
};
