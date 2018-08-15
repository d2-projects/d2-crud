<template>
  <d2-container type="full">
    <h1 class="d2-mt-0">
      功能 1 <d2-icon name="caret-right"/> 页面 1
    </h1>
    <d2-crud
      style="width: 100%"
      ref="d2Crud"
      :columns="columns"
      :data="data"
      border
      highlight-current-row
      :index-row="indexRow"
      :selection-row="selectionRow"
      :default-sort="defaultSort"
      :row-handle="rowHandle"
      show-summary
      :summary-method="getSummaries"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @row-save="handleRowSave"
      @edit-cancel="handleEditCancel"
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
          width: '250',
          sortable: true,
          component: {
            name: 'el-date-picker',
          },
        },
        {
          title: '姓名',
          width: '300',
          children: [
            {
              title: '小名',
              key: 'shortName',
              width: '100',
              component: {
                name: 'el-input',
              },
            },
            {
              title: '大名',
              key: 'fullName',
              width: '100',
              component: {
                name: 'el-input',
                // size: 'medium'
              },
            },
          ],
        },
        {
          title: '性别',
          key: 'sex',
          width: '100',
          component: {
            name: 'el-select',
            options: [
              {
                value: '1',
                label: '男',
              },
              {
                value: '0',
                label: '女',
              },
            ],
          },
        },
        {
          title: '省份',
          key: 'province',
          width: '100',
          component: {
            // name: 'el-input',
            render(h, row, column, index) {
              return h('div', {
                style: {
                  color: 'red',
                },
              }, '11');
            },
          },
        },
        {
          title: '市区',
          key: 'city',
          width: '100',
          component: {
            name: 'el-tag',
          },
        },
        {
          title: '邮编',
          key: 'zip',
          width: '200',
          component: {
            name: 'el-input',
          },
        },
        {
          title: '地址',
          key: 'address',
          width: '220',
          showOverflowTooltip: true,
          component: {
            name: 'el-input',
          },
        },
      ],
      data: [
        {
          date: '2016-05-02',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1517 弄',
          rowClassName: 'warning-row',
        },
        {
          date: '2016-05-01',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-07',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-08',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
          province: '上海',
          city: '普陀区',
          zip: 200333,
          address: '中华人民共和国上海市普陀区金沙江路 1519 弄',
          rowClassName: 'success-row',
        },
        {
          date: '2016-05-05',
          shortName: '小虎',
          fullName: '王小虎',
          sex: '1',
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
      rowHandle: {
        label: '操作1',
        width: '160',
        fixed: 'right',
        edit: {
          text: '编辑1',
          handleClose: false,
          handleSave: false,
          dialogWidth: '60%',
          labelPosition: 'left',
          labelWidth: '80px',
          inline: false,
          gutter: 20,
          formTemplate: {
            date: {
              title: '日期',
              value: '11',
              component: {
                name: 'el-date-picker',
                span: 12,
              },
            },
            shortName: {
              title: '小名',
              value: '22',
              component: {
                name: 'el-input',
                span: 12,
              },
            },
            fullName: {
              title: '大名',
              value: '33',
            },
            sex: {
              title: '性别',
              value: '',
              component: {
                // name: 'el-select',
                // options: [
                //   {
                //     value: '1',
                //     label: '男',
                //   },
                //   {
                //     value: '0',
                //     label: '女',
                //   },
                // ]
                name: 'el-switch',
                activeValue: '1',
                inactiveValue: '0',
                activeText: '男',
                inactiveText: '女',
              },
            },
            province: {
              title: '省份',
              value: '',
            },
            city: {
              title: '市区',
              value: '',
            },
            zip: {
              title: '邮编',
              value: '',
              component: {
                name: 'el-input-number',
              },
            },
            address: {
              title: '地址',
              value: '',
            },
          },
        },
        custom: [
          {
            text: '保存1',
            emit: 'row-save',
          },
        ],
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
    handleRowSave({ index, row }) {
      console.log(index, row);
    },
    handleEditCancel() {
      // this.$refs.d2Crud.closeDialog();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            }
            return prev;
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
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
