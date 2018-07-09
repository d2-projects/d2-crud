<template>
  <d2-container type="full">
    <h1 class="d2-mt-0">
      功能 1 <d2-icon name="caret-right"/> 页面 1
    </h1>
    <d2-curd
     style="width: 100%"
     :columns="columns"
     :data="data">
    </d2-curd>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '日期',
          key: 'date',
          width: '100',
        },
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '地址',
          key: 'address',
        },
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
};
</script>

