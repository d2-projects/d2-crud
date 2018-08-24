import d2Crud from './d2-crud.vue'

const install = (Vue, options) => {
  if (options) {
    Vue.prototype.$d2CrudSize = options.size ? options.size : null
  } else {
    Vue.prototype.$d2CrudSize = null
  }
  Vue.component('d2Crud', d2Crud)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(d2Crud, { install })
