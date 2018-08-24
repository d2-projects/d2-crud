<template>
  <div>
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :label="handleAttribute(item.title, '')"
      :prop="handleAttribute(item.key, null)"
      v-bind="item"
    >
      <template slot-scope="scope">
        <el-input
          v-if="item.component && item.component.name === 'el-input'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-input>
        <el-input-number
          v-else-if="item.component && item.component.name === 'el-input-number'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-input-number>
        <el-radio-group
          v-else-if="item.component && item.component.name === 'el-radio'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
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
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
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
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
          <el-option
            v-for="option in item.component.options"
            :key="option.value"
            v-bind="option"
          >
          </el-option>
        </el-select>
        <el-cascader
          v-else-if="item.component && item.component.name === 'el-cascader'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-cascader>
        <el-switch
          v-else-if="item.component && item.component.name === 'el-switch'"
          v-model="scope.row[item.key]"
          v-bind="item.component"
        >
        </el-switch>
        <el-slider
          v-else-if="item.component && item.component.name === 'el-slider'"
          v-model="scope.row[item.key]"
          v-bind="item.component"
        >
        </el-slider>
        <el-time-select
          v-else-if="item.component && item.component.name === 'el-time-select'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-time-select>
        <el-time-picker
          v-else-if="item.component && item.component.name === 'el-time-picker'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-time-picker>
        <el-date-picker
          v-else-if="item.component && item.component.name === 'el-date-picker'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-date-picker>
        <el-rate
          v-else-if="item.component && item.component.name === 'el-rate'"
          v-model="scope.row[item.key]"
          v-bind="item.component"
        >
        </el-rate>
        <el-color-picker
          v-else-if="item.component && item.component.name === 'el-color-picker'"
          v-model="scope.row[item.key]"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
        </el-color-picker>
        <el-tag
          v-else-if="item.component && item.component.name === 'el-tag'"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
        >
          {{scope.row[item.key]}}
        </el-tag>
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
import utils from '../mixin/utils'
import renderComponent from '../components/renderComponent.vue'

export default {
  name: 'd2-column',
  mixins: [
    utils
  ],
  components: {
    renderComponent
  },
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true,
    }
  }
}
</script>
