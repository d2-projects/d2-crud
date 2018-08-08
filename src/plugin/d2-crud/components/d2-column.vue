<template>
  <div>
    <el-table-column
      v-for="(item, index) in columns"
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
      <template slot-scope="scope">
        <el-input
          v-if="item.component && item.component.name === 'el-input'"
          v-model="scope.row[item.key]"
          :type="handleAttribute(item.component.type, 'text')"
          :maxlength="handleAttribute(item.component.maxlength, null)"
          :minlength="handleAttribute(item.component.minlength, null)"
          :placeholder="handleAttribute(item.component.placeholder, null)"
          :clearable="handleAttribute(item.component.clearable, false)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :size="handleAttribute(item.component.size, null)"
          :prefix-icon="handleAttribute(item.component.prefixIcon, null)"
          :suffix-icon="handleAttribute(item.component.suffixIcon, null)"
          :rows="handleAttribute(item.component.rows, 2)"
          :autosize="handleAttribute(item.component.autosize, false)"
          :auto-complete="handleAttribute(item.component.autosize, 'off')"
          :readonly="handleAttribute(item.component.readonly, false)"
          :max="handleAttribute(item.component.max, null)"
          :min="handleAttribute(item.component.min, null)"
          :step="handleAttribute(item.component.step, null)"
          :resize="handleAttribute(item.component.resize, null)"
          :autofocus="handleAttribute(item.component.autofocus, false)"
          :label="handleAttribute(item.component.label, null)"
          :tabindex="handleAttribute(item.component.tabindex, null)"
        >
        </el-input>
        <el-input-number
          v-else-if="item.component && item.component.name === 'el-input-number'"
          v-model="scope.row[item.key]"
          :min="handleAttribute(item.component.min, -Infinity)"
          :max="handleAttribute(item.component.max, Infinity)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :step="handleAttribute(item.component.step, 1)"
          :precision="handleAttribute(item.component.precision, 0)"
          :controls="handleAttribute(item.component.controls, true)"
          :controls-position="handleAttribute(item.component.controlsPosition, null)"
          :size="handleAttribute(item.component.size, null)"
        >
        </el-input-number>
        <el-radio-group
          v-else-if="item.component && item.component.name === 'el-radio'"
          v-model="scope.row[item.key]"
          :disabled="handleAttribute(item.component.disabled, false)"
          :size="handleAttribute(item.component.size, null)"
          :text-color="handleAttribute(item.component.textColor, '#ffffff')"
          :fill="handleAttribute(item.component.fill, '#409EFF')"
        >
          <template v-if="item.component.buttonMode">
            <el-radio-button
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-radio>
          </template>
        </el-radio-group>
        <el-checkbox-group
          v-else-if="item.component && item.component.name === 'el-checkbox'"
          v-model="scope.row[item.key]"
          :disabled="handleAttribute(item.component.disabled, false)"
          :size="handleAttribute(item.component.size, null)"
          :min="handleAttribute(item.component.min, null)"
          :max="handleAttribute(item.component.max, null)"
          :text-color="handleAttribute(item.component.textColor, '#ffffff')"
          :fill="handleAttribute(item.component.fill, '#409EFF')"
        >
          <template v-if="item.component.buttonMode">
            <el-checkbox-button
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-checkbox-button>
          </template>
          <template v-else>
            <el-checkbox
              v-for="option in item.component.options"
              :key="option.value"
              :label="option.value"
            >
              {{option.label}}
            </el-checkbox>
          </template>
        </el-checkbox-group>
        <el-select
          v-else-if="item.component && item.component.name === 'el-select'"
          v-model="scope.row[item.key]"
          :multiple="handleAttribute(item.component.multiple, false)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :size="handleAttribute(item.component.size, null)"
          :clearable="handleAttribute(item.component.clearable, false)"
          :collapse-tags="handleAttribute(item.component.collapseTags, false)"
          :multiple-limit="handleAttribute(item.component.multipleLimit, 0)"
          :auto-complete="handleAttribute(item.component.autoComplete, 'off')"
          :placeholder="handleAttribute(item.component.placeholder, '请选择')"
          :filterable="handleAttribute(item.component.filterable, false)"
          :allow-create="handleAttribute(item.component.allowCreate, false)"
          :filter-method="handleAttribute(item.component.filterMethod, null)"
          :remote="handleAttribute(item.component.remote, false)"
          :remote-method="handleAttribute(item.component.remoteMethod, null)"
          :loading="handleAttribute(item.component.loading, false)"
          :loading-text="handleAttribute(item.component.loadingText, '加载中')"
          :no-match-text="handleAttribute(item.component.noMatchText, '无匹配数据')"
          :no-data-text="handleAttribute(item.component.noDataText, '无数据')"
          :popper-class="handleAttribute(item.component.popperClass, null)"
          :reserve-keyword="handleAttribute(item.component.reserveKeyword, false)"
          :default-first-option="handleAttribute(item.component.defaultFirstOption, false)"
          :popper-append-to-body="handleAttribute(item.component.popperAppendToBody, true)"
          :automatic-dropdown="handleAttribute(item.component.automaticDropdown, false)"
        >
          <el-option
            v-for="option in item.component.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="handleAttribute(option.disabled, false)"
          >
          </el-option>
        </el-select>
        <el-cascader
          v-else-if="item.component && item.component.name === 'el-cascader'"
          v-model="scope.row[item.key]"
          :disabled="handleAttribute(item.component.disabled, false)"
          :clearable="handleAttribute(item.component.clearable, false)"
          :size="handleAttribute(item.component.size, null)"
          :options="handleAttribute(item.component.options, null)"
          :props="handleAttribute(item.component.props, null)"
          :separator="handleAttribute(item.component.separator, '/')"
          :popper-class="handleAttribute(item.component.popperClass, null)"
          :placeholder="handleAttribute(item.component.placeholder, null)"
          :expand-trigger="handleAttribute(item.component.expandTrigger, 'click')"
          :show-all-levels="handleAttribute(item.component.showAllLevels, true)"
          :filterable="handleAttribute(item.component.filterable, false)"
          :debounce="handleAttribute(item.component.debounce, 300)"
          :change-on-select="handleAttribute(item.component.changeOnSelect, false)"
          :before-filter="handleAttribute(item.component.beforeFilter, null)"
        >
        </el-cascader>
        <el-switch
          v-else-if="item.component && item.component.name === 'el-switch'"
          v-model="scope.row[item.key]"
          :disabled="handleAttribute(item.component.disabled, false)"
          :width="handleAttribute(item.component.width, 40)"
          :active-icon-class="handleAttribute(item.component.activeIconClass, null)"
          :inactive-icon-class="handleAttribute(item.component.inactiveIconClass, null)"
          :active-text="handleAttribute(item.component.activeText, null)"
          :inactive-text="handleAttribute(item.component.inactiveText, null)"
          :active-value="handleAttribute(item.component.activeValue, true)"
          :inactive-value="handleAttribute(item.component.inactiveValue, false)"
          :active-color="handleAttribute(item.component.activeColor, '#409EFF')"
          :inactive-color="handleAttribute(item.component.inactiveColor, '#C0CCDA')"
        >
        </el-switch>
        <el-slider
          v-else-if="item.component && item.component.name === 'el-slider'"
          v-model="scope.row[item.key]"
          :min="handleAttribute(item.component.min, 0)"
          :max="handleAttribute(item.component.max, 100)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :step="handleAttribute(item.component.step, 1)"
          :show-input="handleAttribute(item.component.showInput, false)"
          :show-input-controls="handleAttribute(item.component.showInputControls, true)"
          :input-size="handleAttribute(item.component.inputSize, 'small')"
          :show-stops="handleAttribute(item.component.showStops, false)"
          :show-tooltip="handleAttribute(item.component.showTooltip, true)"
          :format-tooltip="handleAttribute(item.component.formatTooltip, null)"
          :range="handleAttribute(item.component.range, false)"
          :debounce="handleAttribute(item.component.debounce, 300)"
          :tooltip-class="handleAttribute(item.component.tooltipClass, null)"
        >
        </el-slider>
        <el-time-select
          v-else-if="item.component && item.component.name === 'el-time-select'"
          v-model="scope.row[item.key]"
          :readonly="handleAttribute(item.component.readonly, false)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :editable="handleAttribute(item.component.editable, true)"
          :clearable="handleAttribute(item.component.clearable, true)"
          :size="handleAttribute(item.component.size, null)"
          :placeholder="handleAttribute(item.component.placeholder, null)"
          :start-placeholder="handleAttribute(item.component.startPlaceholder, null)"
          :end-placeholder="handleAttribute(item.component.endPlaceholder, null)"
          :align="handleAttribute(item.component.align, 'left')"
          :picker-options="handleAttribute(item.component.pickerOptions, {})"
          :range-separator="handleAttribute(item.component.rangeSeparator, '-')"
          :default-value="handleAttribute(item.component.defaultValue, null)"
          :prefix-icon="handleAttribute(item.component.prefixIcon, 'el-icon-time')"
          :clear-icon="handleAttribute(item.component.clearIcon, 'el-icon-circle-close')"
        >
        </el-time-select>
        <el-time-picker
          v-else-if="item.component && item.component.name === 'el-time-picker'"
          v-model="scope.row[item.key]"
          :readonly="handleAttribute(item.component.readonly, false)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :editable="handleAttribute(item.component.editable, true)"
          :clearable="handleAttribute(item.component.clearable, true)"
          :size="handleAttribute(item.component.size, null)"
          :placeholder="handleAttribute(item.component.placeholder, null)"
          :start-placeholder="handleAttribute(item.component.startPlaceholder, null)"
          :end-placeholder="handleAttribute(item.component.endPlaceholder, null)"
          :is-range="handleAttribute(item.component.isRange, false)"
          :arrow-control="handleAttribute(item.component.arrowControl, false)"
          :align="handleAttribute(item.component.align, 'left')"
          :popper-class="handleAttribute(item.component.popperClass, null)"
          :picker-options="handleAttribute(item.component.pickerOptions, {})"
          :range-separator="handleAttribute(item.component.rangeSeparator, '-')"
          :value-format="handleAttribute(item.component.valueFormat, null)"
          :default-value="handleAttribute(item.component.defaultValue, null)"
          :prefix-icon="handleAttribute(item.component.prefixIcon, 'el-icon-time')"
          :clear-icon="handleAttribute(item.component.clearIcon, 'el-icon-circle-close')"
        >
        </el-time-picker>
        <el-date-picker
          v-else-if="item.component && item.component.name === 'el-date-picker'"
          v-model="scope.row[item.key]"
          :readonly="handleAttribute(item.component.readonly, false)"
          :editable="handleAttribute(item.component.editable, true)"
          :clearable="handleAttribute(item.component.clearable, true)"
          :size="handleAttribute(item.component.size, null)"
          :placeholder="handleAttribute(item.component.placeholder, null)"
          :start-placeholder="handleAttribute(item.component.startPlaceholder, null)"
          :end-placeholder="handleAttribute(item.component.endPlaceholder, null)"
          :type="handleAttribute(item.component.type, 'date')"
          :format="handleAttribute(item.component.format, 'yyyy-MM-dd')"
          :align="handleAttribute(item.component.align, 'left')"
          :popper-class="handleAttribute(item.component.popperClass, null)"
          :picker-options="handleAttribute(item.component.pickerOptions, {})"
          :range-separator="handleAttribute(item.component.rangeSeparator, '-')"
          :default-value="handleAttribute(item.component.defaultValue, null)"
          :default-time="handleAttribute(item.component.defaultTime, null)"
          :value-format="handleAttribute(item.component.valueFormat, null)"
          :unlink-panels="handleAttribute(item.component.unlinkPanels, false)"
          :prefix-icon="handleAttribute(item.component.prefixIcon, 'el-icon-date')"
          :clear-icon="handleAttribute(item.component.clearIcon, 'el-icon-circle-close')"
        >
        </el-date-picker>
        <el-rate
          v-else-if="item.component && item.component.name === 'el-rate'"
          v-model="scope.row[item.key]"
          :max="handleAttribute(item.component.max, 5)"
          :disabled="handleAttribute(item.component.disabled, false)"
          :allow-half="handleAttribute(item.component.allowHalf, false)"
          :low-threshold="handleAttribute(item.component.lowThreshold, 2)"
          :high-threshold="handleAttribute(item.component.highThreshold, 4)"
          :colors="handleAttribute(item.component.colors, ['#F7BA2A', '#F7BA2A', '#F7BA2A'])"
          :void-color="handleAttribute(item.component.voidColors, '#C6D1DE')"
          :disabled-void-color="handleAttribute(item.component.disabledVoidColor, '#EFF2F7')"
          :icon-classes="handleAttribute(item.component.iconClasses, ['el-icon-star-on', 'el-icon-star-on','el-icon-star-on'])"
          :void-icon-class="handleAttribute(item.component.voidIconClass, 'el-icon-star-off')"
          :disabled-void-icon-class="handleAttribute(item.component.disabledVoidIconClass, 'el-icon-star-on')"
          :show-text="handleAttribute(item.component.showText, false)"
          :show-score="handleAttribute(item.component.showScore, false)"
          :text-color="handleAttribute(item.component.textColor, '#1F2D3D')"
          :texts="handleAttribute(item.component.texts, ['极差', '失望', '一般', '满意', '惊喜'])"
          :score-template="handleAttribute(item.component.scoreTemplate, '{value}')"
        >
        </el-rate>
        <el-color-picker
          v-else-if="item.component && item.component.name === 'el-color-picker'"
          v-model="scope.row[item.key]"
          :disabled="handleAttribute(item.component.disabled, false)"
          :size="handleAttribute(item.component.size, null)"
          :show-alpha="handleAttribute(item.component.showAlpha, false)"
          :color-format="handleAttribute(item.component.colorFormat, item.component.showAlpha ? 'rgb' : 'hex')"
          :popper-class="handleAttribute(item.component.popperClass, null)"
          :predefine="handleAttribute(item.component.predefine, null)"
        >
        </el-color-picker>
        <render-component
          v-else-if="item.component && item.component.render"
          :render-function="item.component.render"
          :scope="scope"
        >
        </render-component>
        <template v-else>{{scope.row[item.key]}}</template>
      </template>
      <d2-column v-if="item.children" :columns="item.children"></d2-column>
    </el-table-column>
  </div>
</template>

<script>
import utils from '../mixin/utils';
import renderComponent from '../components/renderComponent.vue';

export default {
  name: 'd2-column',
  mixins: [
    utils,
  ],
  components: {
    renderComponent,
  },
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>
