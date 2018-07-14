<template>
  <div>
    <el-table
      ref="elTable"
      :data="d2Data"
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
        :width="handleAttribute(selectionRow.width, null)"
        :fixed="handleAttribute(selectionRow.fixed, false)"
      >
      </el-table-column>
      <el-table-column
        v-if="indexRow"
        type="index"
        :label="handleAttribute(indexRow.label, '序号')"
        :width="handleAttribute(indexRow.width, null)"
        :fixed="handleAttribute(indexRow.fixed, false)">
      </el-table-column>
      <el-table-column
        v-for="(item, index) of columns"
        :key="index"
        :label="handleAttribute(item.title, '')"
        :prop="handleAttribute(item.key, null)"
        :width="handleAttribute(item.width, null)"
        :min-width="handleAttribute(item.minWidth, null)"
        :fixed="handleAttribute(item.fixed, false)"
        :show-overflow-tooltip="handleAttribute(item.showOverflowTooltip, false)"
        :sortable="handleAttribute(item.sortable, false)"
        :sort-method="handleAttribute(item.sortMethod, null)"
        :sort-by="handleAttribute(item.sortBy, null)"
        :formatter="handleAttribute(item.formatter, null)"
        :filters="handleAttribute(item.filters, null)"
        :filter-method="handleAttribute(item.filterMethod, null)"
        :filter-placement="handleAttribute(item.filterPlacement, null)"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="(item2, index2) in item.children"
            :key="index2"
            :label="handleAttribute(item2.title, '')"
            :prop="handleAttribute(item2.key, null)"
            :width="handleAttribute(item2.width, null)"
            :min-width="handleAttribute(item2.minWidth, null)"
            :fixed="handleAttribute(item2.fixed, false)"
            :show-overflow-tooltip="handleAttribute(item2.showOverflowTooltip, false)"
            :sortable="handleAttribute(item2.sortable, false)"
            :sort-method="handleAttribute(item2.sortMethod, null)"
            :sort-by="handleAttribute(item2.sortBy, null)"
            :formatter="handleAttribute(item2.formatter, null)"
            :filters="handleAttribute(item2.filters, null)"
            :filter-method="handleAttribute(item2.filterMethod, null)"
            :filter-placement="handleAttribute(item2.filterPlacement, null)"
          >
            <template v-if="item2.children">
              <el-table-column
                v-for="(item3, index3) in item2.children"
                :key="index3"
                :label="handleAttribute(item3.title, '')"
                :prop="handleAttribute(item3.key, null)"
                :width="handleAttribute(item3.width, null)"
                :min-width="handleAttribute(item3.minWidth, null)"
                :fixed="handleAttribute(item3.fixed, false)"
                :show-overflow-tooltip="handleAttribute(item3.showOverflowTooltip, false)"
                :sortable="handleAttribute(item3.sortable, false)"
                :sort-method="handleAttribute(item3.sortMethod, null)"
                :sort-by="handleAttribute(item3.sortBy, null)"
                :formatter="handleAttribute(item3.formatter, null)"
                :filters="handleAttribute(item3.filters, null)"
                :filter-method="handleAttribute(item3.filterMethod, null)"
                :filter-placement="handleAttribute(item3.filterPlacement, null)"
              >
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column
        v-if="rowHandle"
        :label="handleAttribute(rowHandle.label, '操作')"
        :fixed="handleAttribute(rowHandle.fixed, false)"
        :width="handleAttribute(rowHandle.width, null)"
        :min-width="handleAttribute(rowHandle.minWidth, null)"
      >
        <template slot-scope="scope">
          <el-button
            v-if="rowHandle.edit"
            :size="handleAttribute(rowHandle.edit.size, 'mini')"
            :type="handleAttribute(rowHandle.edit.type, null)"
            :icon="handleAttribute(rowHandle.edit.icon, null)"
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
      :width="handleAttribute(rowHandle.edit.dialogWidth, '50%')">
      <el-form
        ref="form"
        :model="formData"
        :label-position="handleAttribute(rowHandle.edit.labelPosition, 'right')"
        :label-width="handleAttribute(rowHandle.edit.labelWidth, '50px')"
      >
        <el-form-item
          v-for="(value, key, index) in formData"
          :label="formData[key].title"
          :key="index"
        >
          <el-input
            v-if="(!formData[key].component) || formData[key].component.name === 'el-input'"
            v-model="formData[key].value"
          >
          </el-input>
          <el-input-number
            v-else-if="formData[key].component.name === 'el-input-number'"
            v-model="formData[key].value"
            :min="handleAttribute(formData[key].component.min, -Infinity)"
            :max="handleAttribute(formData[key].component.max, Infinity)"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :step="handleAttribute(formData[key].component.step, 1)"
            :precision="handleAttribute(formData[key].component.precision, 0)"
            :controls="handleAttribute(formData[key].component.controls, true)"
            :controls-position="handleAttribute(formData[key].component.controlsPosition, null)"
            :size="handleAttribute(formData[key].component.size, null)"
          >
          </el-input-number>
          <el-select
            v-else-if="formData[key].component.name === 'el-select'"
            v-model="formData[key].value"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :size="handleAttribute(formData[key].component.size, null)"
            :clearable="handleAttribute(formData[key].component.clearable, false)"
            :auto-complete="handleAttribute(formData[key].component.autoComplete, 'off')"
            :placeholder="handleAttribute(formData[key].component.placeholder, '请选择')"
            :filterable="handleAttribute(formData[key].component.filterable, false)"
            :no-data-text="handleAttribute(formData[key].component.noDataText, '无数据')"
            :default-first-option="handleAttribute(formData[key].component.defaultFirstOption, false)"
            :automatic-dropdown="handleAttribute(formData[key].component.automaticDropdown, false)"
          >
            <el-option
              v-for="option in formData[key].component.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            >
            </el-option>
          </el-select>
          <el-switch
            v-else-if="formData[key].component.name === 'el-switch'"
            v-model="formData[key].value"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :width="handleAttribute(formData[key].component.width, 40)"
            :active-value="handleAttribute(formData[key].component.activeValue, true)"
            :inactive-value="handleAttribute(formData[key].component.inactiveValue, false)"
            :active-color="handleAttribute(formData[key].component.activeColor, '#409EFF')"
            :inactive-color="handleAttribute(formData[key].component.inactiveColor, '#C0CCDA')"
            :active-text="handleAttribute(formData[key].component.activeText, null)"
            :inactive-text="handleAttribute(formData[key].component.inactiveText, null)"
            :active-icon-class="handleAttribute(formData[key].component.activeIconClass, null)"
            :inactive-icon-class="handleAttribute(formData[key].component.inactiveIconClass, null)"
          >
          </el-switch>
          <el-slider
            v-else-if="formData[key].component.name === 'el-slider'"
            v-model="formData[key].value"
            :min="handleAttribute(formData[key].component.min, 0)"
            :max="handleAttribute(formData[key].component.max, 100)"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :step="handleAttribute(formData[key].component.step, 1)"
            :show-input="handleAttribute(formData[key].component.showInput, false)"
            :show-input-controls="handleAttribute(formData[key].component.showInputControls, true)"
            :input-size="handleAttribute(formData[key].component.inputSize, 'small')"
            :show-stops="handleAttribute(formData[key].component.showStops, false)"
            :show-tooltip="handleAttribute(formData[key].component.showTooltip, true)"
            :format-tooltip="handleAttribute(formData[key].component.formatTooltip, null)"
            :range="handleAttribute(formData[key].component.range, false)"
            :debounce="handleAttribute(formData[key].component.debounce, 300)"
            :tooltip-class="handleAttribute(formData[key].component.tooltipClass, null)"
          >
          </el-slider>
          <el-time-select
            v-else-if="formData[key].component.name === 'el-time-select'"
            v-model="formData[key].value"
            :readonly="handleAttribute(formData[key].component.readonly, false)"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :editable="handleAttribute(formData[key].component.editable, true)"
            :clearable="handleAttribute(formData[key].component.clearable, true)"
            :size="handleAttribute(formData[key].component.size, null)"
            :placeholder="handleAttribute(formData[key].component.placeholder, null)"
            :start-placeholder="handleAttribute(formData[key].component.startPlaceholder, null)"
            :end-placeholder="handleAttribute(formData[key].component.endPlaceholder, null)"
            :align="handleAttribute(formData[key].component.align, 'left')"
            :picker-options="handleAttribute(formData[key].component.pickerOptions, {})"
            :range-separator="handleAttribute(formData[key].component.rangeSeparator, '-')"
            :default-value="handleAttribute(formData[key].component.defaultValue, null)"
            :prefix-icon="handleAttribute(formData[key].component.prefixIcon, 'el-icon-time')"
            :clear-icon="handleAttribute(formData[key].component.clearIcon, 'el-icon-circle-close')"
          >
          </el-time-select>
          <el-time-picker
            v-else-if="formData[key].component.name === 'el-time-picker'"
            v-model="formData[key].value"
            :readonly="handleAttribute(formData[key].component.readonly, false)"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :editable="handleAttribute(formData[key].component.editable, true)"
            :clearable="handleAttribute(formData[key].component.clearable, true)"
            :size="handleAttribute(formData[key].component.size, null)"
            :placeholder="handleAttribute(formData[key].component.placeholder, null)"
            :start-placeholder="handleAttribute(formData[key].component.startPlaceholder, null)"
            :end-placeholder="handleAttribute(formData[key].component.endPlaceholder, null)"
            :is-range="handleAttribute(formData[key].component.isRange, false)"
            :arrow-control="handleAttribute(formData[key].component.arrowControl, false)"
            :align="handleAttribute(formData[key].component.align, 'left')"
            :popper-class="handleAttribute(formData[key].component.popperClass, null)"
            :picker-options="handleAttribute(formData[key].component.pickerOptions, {})"
            :range-separator="handleAttribute(formData[key].component.rangeSeparator, '-')"
            :value-format="handleAttribute(formData[key].component.valueFormat, null)"
            :default-value="handleAttribute(formData[key].component.defaultValue, null)"
            :prefix-icon="handleAttribute(formData[key].component.prefixIcon, 'el-icon-time')"
            :clear-icon="handleAttribute(formData[key].component.clearIcon, 'el-icon-circle-close')"
          >
          </el-time-picker>
          <el-date-picker
            v-else-if="formData[key].component.name === 'el-date-picker'"
            v-model="formData[key].value"
            :readonly="handleAttribute(formData[key].component.readonly, false)"
          >
          </el-date-picker>
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
import handleRow from './mixin/handleRow';
import data from './mixin/data';
import edit from './mixin/edit';
import save from './mixin/save';
import remove from './mixin/remove';
import dialog from './mixin/dialog';
// import d2Column from './components/d2-column.vue';

export default {
  name: 'd2-crud',
  mixins: [
    base,
    data,
    handleRow,
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
     * @description 组件属性默认值
     */
    handleAttribute(attribute, defaultValue) {
      return attribute || defaultValue;
    },
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
  },
};
</script>
