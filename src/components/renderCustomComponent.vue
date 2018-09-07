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
    }
  },
  render (h) {
    let self = this
    return h(this.componentName, {
      props: {
        value: self.value
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
