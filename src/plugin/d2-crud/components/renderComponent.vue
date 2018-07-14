<script>
export default {
  name: 'render-component',
  props: {
    /**
     * @description 传入的render函数
     */
    renderFunc: {
      type: Function,
      required: true,
    },
    /**
     * @description 传入的scope
     */
    scope: {
      type: Object,
      required: true,
    },
  },
  render(h) {
    return this.handleRender(h, this.scope);
  },
  methods: {
    handleRender(h, scope) {
      return this.renderFunc(h, scope);
    },
  },
};
</script>
