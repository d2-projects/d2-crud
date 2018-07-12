<template>
  <div>
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :height="height"
      :max-height="maxHeight"
      :row-class-name="tableRowClassName"
      :highlight-current-row="highlightCurrentRow"
      :default-sort="defaultSort"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <!-- <d2-column :columns="columns"></d2-column> -->
      <el-table-column
        v-if="selectionRow"
        type="selection"
        :width="selectionRow.width ? selectionRow.width : null"
        :fixed="selectionRow.fixed ? selectionRow.fixed : false"
      >
      </el-table-column>
      <el-table-column
        v-if="indexRow"
        type="index"
        :label="indexRow.label ? indexRow.label : '序号'"
        :width="indexRow.width ? indexRow.width : null"
        :fixed="indexRow.fixed ? indexRow.fixed : false">
      </el-table-column>
      <el-table-column
        v-for="(item, index) of columns"
        :prop="item.key ? item.key : null"
        :label="item.title"
        :width="item.width ? item.width : null"
        :min-width="item.minWidth ? item.minWidth : null"
        :fixed="item.fixed ? item.fixed : false"
        :show-overflow-tooltip="item.showOverflowTooltip ? item.showOverflowTooltip : false"
        :sortable="item.sortable ? item.sortable : false"
        :sort-method="item.sortMethod ? item.formatter : null"
        :sort-by="item.sortBy ? item.sortBy : null"
        :formatter="item.formatter ? item.formatter : null"
        :filters="item.filters ? item.filters : null"
        :filter-method="item.filterMethod ? item.filterMethod : null"
        :filter-placement="item.filterPlacement ? item.filterPlacement : null"
        :key="index"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="(item2, index2) in item.children"
            :prop="item2.key ? item2.key : null"
            :label="item2.title"
            :width="item2.width ? item2.width : null"
            :min-width="item2.minWidth ? item2.minWidth : null"
            :fixed="item2.fixed ? item2.fixed : false"
            :show-overflow-tooltip="item2.showOverflowTooltip ? item2.showOverflowTooltip : false"
            :sortable="item2.sortable ? item2.sortable : false"
            :sort-method="item2.sortMethod ? item2.formatter : null"
            :sort-by="item2.sortBy ? item2.sortBy : null"
            :formatter="item2.formatter ? item2.formatter : null"
            :filters="item2.filters ? item2.filters : null"
            :filter-method="item2.filterMethod ? item2.filterMethod : null"
            :filter-placement="item2.filterPlacement ? item2.filterPlacement : null"
            :key="index2"
          >
            <template v-if="item2.children">
              <el-table-column
                v-for="(item3, index3) in item2.children"
                :prop="item3.key ? item3.key : null"
                :label="item3.title"
                :width="item3.width ? item3.width : null"
                :min-width="item3.minWidth ? item3.minWidth : null"
                :fixed="item3.fixed ? item3.fixed : false"
                :show-overflow-tooltip="item3.showOverflowTooltip ? item3.showOverflowTooltip : false"
                :sortable="item3.sortable ? item3.sortable : false"
                :sort-method="item3.sortMethod ? item3.formatter : null"
                :sort-by="item3.sortBy ? item3.sortBy : null"
                :formatter="item3.formatter ? item3.formatter : null"
                :filters="item3.filters ? item3.filters : null"
                :filter-method="item3.filterMethod ? item3.filterMethod : null"
                :filter-placement="item3.filterPlacement ? item3.filterPlacement : null"
                :key="index3"
              >
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column
        v-if="rowHandle"
        :label="rowHandle.label ? rowHandle.label : '操作'"
        :fixed="rowHandle.fixed ? rowHandle.fixed : false"
        :width="rowHandle.width ? rowHandle.width : null"
        :min-width="rowHandle.minWidth ? rowHandle.minWidth : null"
      >
        <template slot-scope="scope">
          <el-button
            v-if="rowHandle.edit"
            :size="rowHandle.edit.size ? rowHandle.edit.size : 'mini'"
            :type="rowHandle.edit.type ? rowHandle.edit.type : null"
            :icon="rowHandle.edit.icon ? rowHandle.edit.icon : null"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            v-if="rowHandle.save"
            :size="rowHandle.save.size ? rowHandle.save.size : 'mini'"
            :type="rowHandle.save.type ? rowHandle.save.type : 'primary'"
            :icon="rowHandle.save.icon ? rowHandle.save.icon : null"
            @click="handleSave(scope.$index, scope.row)"
          >保存</el-button>
          <el-button
            v-if="rowHandle.remove"
            :size="rowHandle.remove.size ? rowHandle.remove.size : 'mini'"
            :type="rowHandle.remove.type ? rowHandle.remove.type : 'danger'"
            :icon="rowHandle.remove.icon ? rowHandle.remove.icon : null"
            @click="handleRemove(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      :before-close="handleEditCancel"
      width="30%">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item
          v-for="(value, key, index) in formData"
          :label="formData[key].title"
          :key="index"
        >
          <el-input v-model="formData[key].value"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleEditSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import base from './mixin/base';
import rowHandle from './mixin/rowHandle';
import edit from './mixin/edit';
import save from './mixin/save';
import remove from './mixin/remove';
import dialog from './mixin/dialog';
// import d2Column from './components/d2-column.vue';

export default {
  name: 'd2Crud',
  mixins: [
    base,
    rowHandle,
    edit,
    save,
    remove,
    dialog,
  ],
  components: {
    // d2Column,
  },
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
    /**
     * @description 表格状态
     */
    tableRowClassName({ row }) {
      if (row.rowClassName) {
        return row.rowClassName;
      }
      return null;
    },
    /**
     * @description 行选中状态
     */
    handleCurrentChange(val) {
      this.$emit('current-change', val);
    },
    /**
     * @description 复选框选中转状态
     */
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    },
    /**
     * @description 排序状态
     */
    handleSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order });
    },
  },
};
</script>
