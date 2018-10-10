<template>
  <div class="grid-btn">
			<span v-if="hasPermission(permissionPath + 'save')">
            <a class="btn btn-primary" @click="$emit('add')"><i class="fa fa-plus"></i>&nbsp;新增</a>
			</span>
      <span v-if="hasPermission(permissionPath + 'update')">
            <a class="btn btn-primary" @click="$emit('save')"><i class="fa fa-pencil-square-o"></i>&nbsp;修改</a>
			</span>
      <span v-if="hasPermission(permissionPath + 'delete')">
            <a class="btn btn-primary" @click="$emit('del')"><i class="fa fa-trash-o"></i>&nbsp;删除</a>
			</span>

    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="viewData"
      :options="options"
      :form-template="formTemplate"
      :form-options="formOptions"
      :form-rules="formRules"
      @dialog-cancel="handleDialogCancel"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      selection-row
      @selection-change="selectionChangeHandle"
      :pagination="pagination">
    </d2-crud>
  </div>

</template>

<script>
  // import d2Crud from './d2-crud'
  // import element from './element.js'
  import crud from './mixin/crud.js'

  export default {
    name: 'crud',
    mixins:[crud],
    data() {
      return {
        dataForm: {
          key: ''
        },
        viewData: [],
        dataList: [],
        pageIndex: 0,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        options: {
          border: true,
          size: 'mini'
        },
        pagination: {
          pageSize: 10,
          layout: '->, prev, pager, next, total'
        },
        formOptions: {
          labelWidth: '90px',
          labelPosition: 'right',
          saveLoading: false,
          gutter: 10
        },
        permissionPath:''
      }
    },
    computed: {
      columns() { return this.colModel.map(it => ({'title': it.label, key: it.name, showOverflowTooltip: true}))},
      formTemplate() {
        const formColumns = this.columns.filter(it => it.key != 'id')
        const formTemplate = {}
        formColumns.forEach(it => formTemplate[it.key] = {
          title: it.title, component: {
            span: 12
          }
        })
        return formTemplate
      },
      formRules() {
        const formColumns = this.columns.filter(it => it.key != 'id')
        const formRules = {}
        formColumns.forEach(it => formRules[it.key] = [{required: true, message: '字段不能为空请输入', trigger: 'blur'}])
        return formRules
      }
    },
    created() {
      this.entityName = this.$parent.entityName
      this.colModel = this.$parent.colModel
      this.permissionPath = this.$parent.modulePath.replace(/\//g,':')
      this.entityClass = spring.extend(this.entityName)
      this.$on('add', this.toAdd)
      this.$on('save', this.toUpdate)
      this.$on('del', this.remove)
    },
    async mounted() {
      const search = self.location.search
      const id = search.substring(search.indexOf('=') + 1)
      if (id) {this.id = id}

      this.getDataList()
    },
    methods: {
      hasPermission: window.hasPermission,
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 0
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      toAdd() {
        this.$refs.d2Crud.handleAdd()
        this.current = new this.entityClass()
      },
      getSelectedRow(event) {
        const selectedIDs = this.dataListSelections
        if (selectedIDs.length == 0) {
          alert('请选择一条记录')
          return
        }
        if (selectedIDs.length > 1) {
          alert('只能选择一条记录')
          return
        }

        return selectedIDs[0]
      },
      toUpdate(event) {
        const row = this.getSelectedRow()
        if (!row) return
        const d2Crud = this.$refs.d2Crud
        if (d2Crud) {
          d2Crud.handleEdit(row.id, row)
        }
        else {
          this.current = row
          this.showList = false
          this.title = '修改'
        }
      },
      handleRowAdd(row, done) {
        this.formOptions.saveLoading = true
        this.current.patchData(row)
        this.addDate()
        this.current.save().then(this.success(done)).catch(this.fail)
        this.formOptions.saveLoading = false
      },
      handleRowEdit({index, row}, done) {
        this.formOptions.saveLoading = true
        this.current = row
        this.addDate()
        this.current.save().then(this.success(done)).catch(this.fail)
        this.formOptions.saveLoading = false
      },
      remove() {
        const row = this.getSelectedRow()
        if (!row) return
        confirm('确定要删除选中的记录？', () => {
          row.remove().then(this.success).catch(this.fail)
        })
      },
      handleDialogCancel(done) {
        // this.$message({
        //   message: '取消编辑',
        //   type: 'warning'
        // })
        done()
      },
      // 获取数据列表
      async getDataList() {
        this.dataListLoading = true
        const param = {
          'page': this.pageIndex,
          'size': this.pageSize
          // 'key': this.dataForm.key
        }
        this.viewData = await this.findData(param)

        this.totalPage = this.viewData.page.totalElements
        this.dataListLoading = false
      },
      async findData(param) {
        if (this.id) {
          return this.searchData(param, this.id)
        }
        return await this.entityClass.findAll(param)
      },
      dateChange(val) {
        val.value = val.picker.date
      }
    }
  }
</script>

<style scoped>

</style>
