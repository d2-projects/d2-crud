import d2Curd from './d2-curd.vue';

const install = (Vue) => {
  Vue.component('d2Curd', d2Curd);
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(d2Curd, { install });
