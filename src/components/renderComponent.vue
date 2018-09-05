<script>
export default {
  name: 'render-component',
  props: {
    /**
     * @description 传入的render函数
     */
    renderFunction: {
      type: Function,
      required: true
    },
    /**
     * @description 传入的scope
     */
    scope: {
      default: null
    },
  },
  render (h) {
    return this.handleRender(h, this.scope)
  },
  methods: {
    handleRender (h, scope) {
      if (typeof scope === 'string') {
        return this.renderFunction(h, scope)
      }
      return this.renderFunction(h, scope.row, scope.column, scope.$index)
    }
  }
}
</script>
