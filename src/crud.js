import crud from './crud.vue'

if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('crud', crud)
}

export default crud
