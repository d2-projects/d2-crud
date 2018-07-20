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
          >{{handleAttribute(rowHandle.edit.text, '编辑')}}</el-button>
          <el-button
            v-for="(item, index) in handleAttribute(rowHandle.custom, [])"
            :key="index"
            :size="handleAttribute(item.size, 'mini')"
            :type="handleAttribute(item.type, 'primary')"
            :icon="handleAttribute(item.icon, null)"
            @click="$emit(item.emit, {index: scope.$index, row: scope.row})"
          >{{item.text}}</el-button>
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
            :type="formData[key].component ? handleAttribute(formData[key].component.type, 'text') : 'text'"
            :maxlength="formData[key].component ? handleAttribute(formData[key].component.maxlength, null) : null"
            :minlength="formData[key].component ? handleAttribute(formData[key].component.minlength, null) : null"
            :placeholder="formData[key].component ? handleAttribute(formData[key].component.placeholder, null) : null"
            :clearable="formData[key].component ? handleAttribute(formData[key].component.clearable, false) : false"
            :disabled="formData[key].component ? handleAttribute(formData[key].component.disabled, false) : false"
            :size="formData[key].component ? handleAttribute(formData[key].component.size, null) : null"
            :prefix-icon="formData[key].component ? handleAttribute(formData[key].component.prefixIcon, null) : null"
            :suffix-icon="formData[key].component ? handleAttribute(formData[key].component.suffixIcon, null) : null"
            :rows="formData[key].component ? handleAttribute(formData[key].component.rows, 2) : 2"
            :autosize="formData[key].component ? handleAttribute(formData[key].component.autosize, false) : false"
            :auto-complete="formData[key].component ? handleAttribute(formData[key].component.autoComplete, 'off') : 'off'"
            :readonly="formData[key].component ? handleAttribute(formData[key].component.readonly, false) : false"
            :max="formData[key].component ? handleAttribute(formData[key].component.max, null) : null"
            :min="formData[key].component ? handleAttribute(formData[key].component.min, null) : null"
            :step="formData[key].component ? handleAttribute(formData[key].component.step, null) : null"
            :resize="formData[key].component ? handleAttribute(formData[key].component.resize, null) : null"
            :autofocus="formData[key].component ? handleAttribute(formData[key].component.autofocus, false) : false"
            :label="formData[key].component ? handleAttribute(formData[key].component.label, null) : null"
            :tabindex="formData[key].component ? handleAttribute(formData[key].component.tabindex, null) : null"
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
          <el-radio-group
            v-else-if="formData[key].component.name === 'el-radio'"
            v-model="formData[key].value"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :size="handleAttribute(formData[key].component.size, null)"
            :text-color="handleAttribute(formData[key].component.textColor, '#ffffff')"
            :fill="handleAttribute(formData[key].component.fill, '#409EFF')"
          >
            <template v-if="formData[key].component.buttonMode">
              <el-radio-button
                v-for="option in formData[key].component.options"
                :key="option.value"
                :label="option.value"
              >
                {{option.label}}
              </el-radio-button>
            </template>
            <template v-else>
              <el-radio
                v-for="option in formData[key].component.options"
                :key="option.value"
                :label="option.value"
              >
                {{option.label}}
              </el-radio>
            </template>
          </el-radio-group>
          <el-checkbox-group
            v-else-if="formData[key].component.name === 'el-checkbox'"
            v-model="formData[key].value"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :size="handleAttribute(formData[key].component.size, null)"
            :min="handleAttribute(formData[key].component.min, null)"
            :max="handleAttribute(formData[key].component.max, null)"
            :text-color="handleAttribute(formData[key].component.textColor, '#ffffff')"
            :fill="handleAttribute(formData[key].component.fill, '#409EFF')"
          >
            <template v-if="formData[key].component.buttonMode">
              <el-checkbox-button
                v-for="option in formData[key].component.options"
                :key="option.value"
                :label="option.value"
              >
                {{option.label}}
              </el-checkbox-button>
            </template>
            <template v-else>
              <el-checkbox
                v-for="option in formData[key].component.options"
                :key="option.value"
                :label="option.value"
              >
                {{option.label}}
              </el-checkbox>
            </template>
          </el-checkbox-group>
          <el-select
            v-else-if="formData[key].component.name === 'el-select'"
            v-model="formData[key].value"
            :multiple="handleAttribute(formData[key].component.multiple, false)"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :size="handleAttribute(formData[key].component.size, null)"
            :clearable="handleAttribute(formData[key].component.clearable, false)"
            :collapse-tags="handleAttribute(formData[key].component.collapseTags, false)"
            :multiple-limit="handleAttribute(formData[key].component.multipleLimit, 0)"
            :auto-complete="handleAttribute(formData[key].component.autoComplete, 'off')"
            :placeholder="handleAttribute(formData[key].component.placeholder, '请选择')"
            :filterable="handleAttribute(formData[key].component.filterable, false)"
            :allow-create="handleAttribute(formData[key].component.allowCreate, false)"
            :filter-method="handleAttribute(formData[key].component.filterMethod, null)"
            :remote="handleAttribute(formData[key].component.remote, false)"
            :remote-method="handleAttribute(formData[key].component.remoteMethod, null)"
            :loading="handleAttribute(formData[key].component.loading, false)"
            :loading-text="handleAttribute(formData[key].component.loadingText, '加载中')"
            :no-match-text="handleAttribute(formData[key].component.noMatchText, '无匹配数据')"
            :no-data-text="handleAttribute(formData[key].component.noDataText, '无数据')"
            :popper-class="handleAttribute(formData[key].component.popperClass, null)"
            :reserve-keyword="handleAttribute(formData[key].component.reserveKeyword, false)"
            :default-first-option="handleAttribute(formData[key].component.defaultFirstOption, false)"
            :popper-append-to-body="handleAttribute(formData[key].component.popperAppendToBody, true)"
            :automatic-dropdown="handleAttribute(formData[key].component.automaticDropdown, false)"
          >
            <el-option
              v-for="option in formData[key].component.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="handleAttribute(option.disabled, false)"
            >
            </el-option>
          </el-select>
          <el-switch
            v-else-if="formData[key].component.name === 'el-switch'"
            v-model="formData[key].value"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :width="handleAttribute(formData[key].component.width, 40)"
            :active-icon-class="handleAttribute(formData[key].component.activeIconClass, null)"
            :inactive-icon-class="handleAttribute(formData[key].component.inactiveIconClass, null)"
            :active-text="handleAttribute(formData[key].component.activeText, null)"
            :inactive-text="handleAttribute(formData[key].component.inactiveText, null)"
            :active-value="handleAttribute(formData[key].component.activeValue, true)"
            :inactive-value="handleAttribute(formData[key].component.inactiveValue, false)"
            :active-color="handleAttribute(formData[key].component.activeColor, '#409EFF')"
            :inactive-color="handleAttribute(formData[key].component.inactiveColor, '#C0CCDA')"
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
            :editable="handleAttribute(formData[key].component.editable, true)"
            :clearable="handleAttribute(formData[key].component.clearable, true)"
            :size="handleAttribute(formData[key].component.size, null)"
            :placeholder="handleAttribute(formData[key].component.placeholder, null)"
            :start-placeholder="handleAttribute(formData[key].component.startPlaceholder, null)"
            :end-placeholder="handleAttribute(formData[key].component.endPlaceholder, null)"
            :type="handleAttribute(formData[key].component.type, 'date')"
            :format="handleAttribute(formData[key].component.format, 'yyyy-MM-dd')"
            :align="handleAttribute(formData[key].component.align, 'left')"
            :popper-class="handleAttribute(formData[key].component.popperClass, null)"
            :picker-options="handleAttribute(formData[key].component.pickerOptions, {})"
            :range-separator="handleAttribute(formData[key].component.rangeSeparator, '-')"
            :default-value="handleAttribute(formData[key].component.defaultValue, null)"
            :default-time="handleAttribute(formData[key].component.defaultTime, null)"
            :value-format="handleAttribute(formData[key].component.valueFormat, null)"
            :unlink-panels="handleAttribute(formData[key].component.unlinkPanels, false)"
            :prefix-icon="handleAttribute(formData[key].component.prefixIcon, 'el-icon-date')"
            :clear-icon="handleAttribute(formData[key].component.clearIcon, 'el-icon-circle-close')"
          >
          </el-date-picker>
          <el-rate
            v-else-if="formData[key].component.name === 'el-rate'"
            v-model="formData[key].value"
            :max="handleAttribute(formData[key].component.max, 5)"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :allow-half="handleAttribute(formData[key].component.allowHalf, false)"
            :low-threshold="handleAttribute(formData[key].component.lowThreshold, 2)"
            :high-threshold="handleAttribute(formData[key].component.highThreshold, 4)"
            :colors="handleAttribute(formData[key].component.colors, ['#F7BA2A', '#F7BA2A', '#F7BA2A'])"
            :void-color="handleAttribute(formData[key].component.voidColors, '#C6D1DE')"
            :disabled-void-color="handleAttribute(formData[key].component.disabledVoidColor, '#EFF2F7')"
            :icon-classes="handleAttribute(formData[key].component.iconClasses, ['el-icon-star-on', 'el-icon-star-on','el-icon-star-on'])"
            :void-icon-class="handleAttribute(formData[key].component.voidIconClass, 'el-icon-star-off')"
            :disabled-void-icon-class="handleAttribute(formData[key].component.disabledVoidIconClass, 'el-icon-star-on')"
            :show-text="handleAttribute(formData[key].component.showText, false)"
            :show-score="handleAttribute(formData[key].component.showScore, false)"
            :text-color="handleAttribute(formData[key].component.textColor, '#1F2D3D')"
            :texts="handleAttribute(formData[key].component.texts, ['极差', '失望', '一般', '满意', '惊喜'])"
            :score-template="handleAttribute(formData[key].component.scoreTemplate, '{value}')"
          >
          </el-rate>
          <el-color-picker
            v-else-if="formData[key].component.name === 'el-color-picker'"
            v-model="formData[key].value"
            :disabled="handleAttribute(formData[key].component.disabled, false)"
            :size="handleAttribute(formData[key].component.size, null)"
            :show-alpha="handleAttribute(formData[key].component.showAlpha, false)"
            :color-format="handleAttribute(formData[key].component.colorFormat, formData[key].component.showAlpha ? 'rgb' : 'hex')"
            :popper-class="handleAttribute(formData[key].component.popperClass, null)"
            :predefine="handleAttribute(formData[key].component.predefine, null)"
          >
          </el-color-picker>
          <render-component
            v-else-if="formData[key].component.render"
            :render-function="formData[key].component.render"
          >
          </render-component>
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
import dialog from './mixin/dialog';
import renderComponent from './components/renderComponent.vue';
// import d2Column from './components/d2-column.vue';

export default {
  name: 'd2-crud',
  mixins: [
    base,
    data,
    handleRow,
    edit,
    dialog,
  ],
  components: {
    renderComponent,
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
