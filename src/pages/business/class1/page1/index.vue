<template>
  <d2-container type="full">
    <h1 class="d2-mt-0">
      功能 1 <d2-icon name="caret-right"/> 页面 1
    </h1>
    <d2-crud
      :columns="columns"
      :data="data"
      border
      highlight-current-row
      :index-row="indexRow"
      :selection-row="selectionRow"
      :default-sort="defaultSort"
      style="width: 100%"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
    </d2-crud>
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
          sortable: true,
        },
        {
          title: '姓名',
          key: '',
          width: '300',
          children: [
            {
              title: '小名',
              key: 'shortName',
            },
            {
              title: '大名',
              key: 'fullName',
            },
          ],
        },
        {
          title: '省份',
          key: 'province',
          width: '300',
          formatter(row, column, cellValue, index) {
            return `${row.province}市`;
          },
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
          showOverflowTooltip: true,
        },
      ],
      data: [
        {
          date: '2016-05-02',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1517 弄',
          rowControl: {
            rowClassName: 'warning-row',
          },
        },
        {
          date: '2016-05-01',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-07',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-08',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1519 弄',
          rowControl: {
            rowClassName: 'success-row',
          },
        },
        {
          date: '2016-05-05',
          shortName: '小虎',
          fullName: '王小虎',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1516 弄',
        },
      ],
      indexRow: {
        show: true,
        width: 50,
        fixed: true,
      },
      selectionRow: {
        show: true,
        width: 50,
        fixed: true,
      },
      defaultSort: {
        prop: 'date',
        order: 'descending',
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(val);
    },
    handleSelectionChange(val) {
      // console.log(val);
    },
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
