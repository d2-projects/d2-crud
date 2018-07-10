import d2Crud from './d2-crud.vue';

const install = (Vue) => {
  Vue.component('d2Crud', d2Crud);
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(d2Crud, { install });
