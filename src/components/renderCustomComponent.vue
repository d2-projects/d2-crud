<script>
export default {
  name: 'render-custom-component',
  props: {
    /**
     * @description v-model双向绑定的值
     */
    value: {
      required: true
    },
    /**
     * @description 传入的组件名
     */
    componentName: {
      required: true
    },
    /**
     * @description 传入的行数据
     */
    scope: {
      default: null
    }
  },
  render (h) {
    let self = this
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope
      },
      on: {
        input: function (event) {
          self.$emit('input', event)
        }
      }
    })
  }
}
</script>
