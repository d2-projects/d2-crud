export default {
  props: {
    /**
     * @description 默认排序
     */
    rowHandle: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * @description 控制操作列 show 的方法
     */
    handleRowHandleButtonShow (show = true, index, row) {
      if (typeof show === 'boolean') {
        return show
      } else if (typeof show === 'function') {
        return show(index, row)
      }
      return Boolean(show)
    },
    /**
     * @description 控制操作列 disabled 的方法
     */
    handleRowHandleButtonDisabled (disabled = false, index, row) {
      if (typeof disabled === 'boolean') {
        return disabled
      } else if (typeof disabled === 'function') {
        return disabled(index, row)
      }
      return Boolean(disabled)
    }
  }
}
