<template>
  <d2-container type="full">
    <h1 class="d2-mt-0">
      功能 1 <d2-icon name="caret-right"/> 页面 1
    </h1>
    <d2-curd
      :columns="columns"
      :data="data"
      border
      style="width: 100%"
    >
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
          fixed: 'left',
        },
        {
          title: '姓名',
          key: 'name',
          width: '300',
        },
        {
          title: '省份',
          key: 'province',
          width: '300',
        },
        {
          title: '市区',
          key: 'city',
          width: '300',
        },
        {
          title: '邮编',
          key: 'zip',
          width: '300',
        },
        {
          title: '地址',
          key: 'address',
          width: '220',
          fixed: 'right',
        },
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '上海市普陀区金沙江路 1517 弄',
          rowControl: {
            rowClassName: 'warning-row',
          },
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '上海市普陀区金沙江路 1516 弄',
          rowControl: {
            rowClassName: 'success-row',
          },
        },
      ],
    };
  },
};
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
