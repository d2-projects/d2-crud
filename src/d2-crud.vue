<template>
  <div
    :element-loading-background="loadingOptions ? handleAttribute(loadingOptions.background, null) : null"
    :element-loading-spinner="loadingOptions ? handleAttribute(loadingOptions.spinner, null) : null"
    :element-loading-text="loadingOptions ? handleAttribute(loadingOptions.text, null) : null"
    class="d2-crud"
    v-loading="loading"
  >
    <div
      class="d2-crud-header"
      v-if="$slots.header"
    >
      <slot name="header"></slot>
    </div>
    <div class="d2-crud-body">
      <el-table
        :data="d2CrudData"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblclick"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @current-change="handleCurrentChange"
        @filter-change="handleFilterChange"
        @header-click="handleHeaderClick"
        @header-contextmenu="handleHeaderContextmenu"
        @row-click="handleRowClick"
        @row-contextmenu="handleRowContextmenu"
        @row-dblclick="handleRowDblclick"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        ref="elTable"
        v-bind="options"
      >
        <el-table-column
          :label="handleAttribute(selectionRow.title, '')"
          type="selection"
          v-bind="selectionRow"
          v-if="selectionRow || selectionRow === ''"
        ></el-table-column>
        <el-table-column
          :label="handleAttribute(indexRow.title, '')"
          type="index"
          v-bind="indexRow"
          v-if="indexRow || indexRow === ''"
        ></el-table-column>
        <!-- 暂不使用d2-column递归组件，有bug -->
        <el-table-column
          :key="index"
          :label="handleAttribute(item.title, '')"
          :prop="handleAttribute(item.key, null)"
          v-bind="item"
          v-for="(item, index) in columns"
        >
          <template slot-scope="scope">
            <el-input
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-if="item.component && item.component.name === 'el-input'"
              v-model="scope.row[item.key]"
            ></el-input>
            <el-input-number
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-input-number'"
              v-model="scope.row[item.key]"
            ></el-input-number>
            <el-radio-group
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-radio'"
              v-model="scope.row[item.key]"
            >
              <template v-if="item.component.buttonMode">
                <el-radio-button
                  :key="option.value"
                  :label="option.value"
                  v-for="option in item.component.options"
                >
                  {{option.label}}
                </el-radio-button>
              </template>
              <template v-else>
                <el-radio
                  :key="option.value"
                  :label="option.value"
                  v-for="option in item.component.options"
                >
                  {{option.label}}
                </el-radio>
              </template>
            </el-radio-group>
            <el-checkbox-group
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-checkbox'"
              v-model="scope.row[item.key]"
            >
              <template v-if="item.component.buttonMode">
                <el-checkbox-button
                  :key="option.value"
                  :label="option.value"
                  v-for="option in item.component.options"
                >
                  {{option.label}}
                </el-checkbox-button>
              </template>
              <template v-else>
                <el-checkbox
                  :key="option.value"
                  :label="option.value"
                  v-for="option in item.component.options"
                >
                  {{option.label}}
                </el-checkbox>
              </template>
            </el-checkbox-group>
            <el-select
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-select'"
              v-model="scope.row[item.key]"
            >
              <el-option
                :key="option.value"
                v-bind="option"
                v-for="option in item.component.options"
              ></el-option>
            </el-select>
            <el-cascader
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-cascader'"
              v-model="scope.row[item.key]"
            ></el-cascader>
            <el-switch
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="item.component"
              v-else-if="item.component && item.component.name === 'el-switch'"
              v-model="scope.row[item.key]"
            ></el-switch>
            <el-slider
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="item.component"
              v-else-if="item.component && item.component.name === 'el-slider'"
              v-model="scope.row[item.key]"
            ></el-slider>
            <el-time-select
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-time-select'"
              v-model="scope.row[item.key]"
            ></el-time-select>
            <el-time-picker
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-time-picker'"
              v-model="scope.row[item.key]"
            ></el-time-picker>
            <el-date-picker
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-date-picker'"
              v-model="scope.row[item.key]"
            ></el-date-picker>
            <el-rate
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="item.component"
              v-else-if="item.component && item.component.name === 'el-rate'"
              v-model="scope.row[item.key]"
            ></el-rate>
            <el-color-picker
              @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item.key, value: scope.row[item.key], row: scope.row})"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item.component) : item.component"
              v-else-if="item.component && item.component.name === 'el-color-picker'"
              v-model="scope.row[item.key]"
            ></el-color-picker>
            <render-custom-component
              :component-name="item.component.name"
              :props="item.component.props ? item.component.props : null"
              :scope="scope"
              v-else-if="item.component && item.component.name"
              v-model="scope.row[item.key]"
            ></render-custom-component>
            <render-component
              :render-function="item.component.render"
              :scope="scope"
              v-else-if="item.component && item.component.render"
            ></render-component>
            <template v-else>{{item.formatter ? item.formatter(scope.row, scope.column, _get(scope.row, item.key),
              scope.$index) : _get(scope.row, item.key)}}
            </template>
          </template>
          <template v-if="item.children">
            <el-table-column
              :key="index2"
              :label="handleAttribute(item2.title, '')"
              :prop="handleAttribute(item2.key, null)"
              v-bind="item2"
              v-for="(item2, index2) in item.children"
            >
              <template slot-scope="scope">
                <el-input
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-if="item2.component && item2.component.name === 'el-input'"
                  v-model="scope.row[item2.key]"
                ></el-input>
                <el-input-number
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-input-number'"
                  v-model="scope.row[item2.key]"
                ></el-input-number>
                <el-radio-group
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-radio'"
                  v-model="scope.row[item2.key]"
                >
                  <template v-if="item2.component.buttonMode">
                    <el-radio-button
                      :key="option.value"
                      :label="option.value"
                      v-for="option in item2.component.options"
                    >
                      {{option.label}}
                    </el-radio-button>
                  </template>
                  <template v-else>
                    <el-radio
                      :key="option.value"
                      :label="option.value"
                      v-for="option in item2.component.options"
                    >
                      {{option.label}}
                    </el-radio>
                  </template>
                </el-radio-group>
                <el-checkbox-group
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-checkbox'"
                  v-model="scope.row[item2.key]"
                >
                  <template v-if="item2.component.buttonMode">
                    <el-checkbox-button
                      :key="option.value"
                      :label="option.value"
                      v-for="option in item2.component.options"
                    >
                      {{option.label}}
                    </el-checkbox-button>
                  </template>
                  <template v-else>
                    <el-checkbox
                      :key="option.value"
                      :label="option.value"
                      v-for="option in item2.component.options"
                    >
                      {{option.label}}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
                <el-select
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-select'"
                  v-model="scope.row[item2.key]"
                >
                  <el-option
                    :key="option.value"
                    v-bind="option"
                    v-for="option in item2.component.options"
                  ></el-option>
                </el-select>
                <el-cascader
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-cascader'"
                  v-model="scope.row[item2.key]"
                ></el-cascader>
                <el-switch
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-switch'"
                  v-model="scope.row[item2.key]"
                ></el-switch>
                <el-slider
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-slider'"
                  v-model="scope.row[item2.key]"
                ></el-slider>
                <el-time-select
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-time-select'"
                  v-model="scope.row[item2.key]"
                ></el-time-select>
                <el-time-picker
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-time-picker'"
                  v-model="scope.row[item2.key]"
                ></el-time-picker>
                <el-date-picker
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-date-picker'"
                  v-model="scope.row[item2.key]"
                ></el-date-picker>
                <el-rate
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-rate'"
                  v-model="scope.row[item2.key]"
                ></el-rate>
                <el-color-picker
                  @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item2.key, value: scope.row[item2.key], row: scope.row})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                  v-else-if="item2.component && item2.component.name === 'el-color-picker'"
                  v-model="scope.row[item2.key]"
                ></el-color-picker>
                <render-custom-component
                  :component-name="item2.component.name"
                  :props="item2.component.props ? item2.component.props : null"
                  :scope="scope"
                  v-else-if="item2.component && item2.component.name"
                  v-model="scope.row[item2.key]"
                ></render-custom-component>
                <render-component
                  :render-function="item2.component.render"
                  :scope="scope"
                  v-else-if="item2.component && item2.component.render"
                ></render-component>
                <template v-else>
                  {{item2.formatter ?
                  item2.formatter(scope.row, scope.column, _get(scope.row,item2.key), scope.$index) :
                  _get(scope.row, item2.key)}}
                </template>
              </template>
              <template v-if="item2.children">
                <el-table-column
                  :key="index3"
                  :label="handleAttribute(item3.title, '')"
                  :prop="handleAttribute(item3.key, null)"
                  v-bind="item3"
                  v-for="(item3, index3) in item2.children"
                >
                  <template slot-scope="scope">
                    <el-input
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-if="item3.component && item3.component.name === 'el-input'"
                      v-model="scope.row[item3.key]"
                    ></el-input>
                    <el-input-number
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-input-number'"
                      v-model="scope.row[item3.key]"
                    ></el-input-number>
                    <el-radio-group
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-radio'"
                      v-model="scope.row[item3.key]"
                    >
                      <template v-if="item3.component.buttonMode">
                        <el-radio-button
                          :key="option.value"
                          :label="option.value"
                          v-for="option in item3.component.options"
                        >
                          {{option.label}}
                        </el-radio-button>
                      </template>
                      <template v-else>
                        <el-radio
                          :key="option.value"
                          :label="option.value"
                          v-for="option in item3.component.options"
                        >
                          {{option.label}}
                        </el-radio>
                      </template>
                    </el-radio-group>
                    <el-checkbox-group
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-checkbox'"
                      v-model="scope.row[item3.key]"
                    >
                      <template v-if="item3.component.buttonMode">
                        <el-checkbox-button
                          :key="option.value"
                          :label="option.value"
                          v-for="option in item3.component.options"
                        >
                          {{option.label}}
                        </el-checkbox-button>
                      </template>
                      <template v-else>
                        <el-checkbox
                          :key="option.value"
                          :label="option.value"
                          v-for="option in item3.component.options"
                        >
                          {{option.label}}
                        </el-checkbox>
                      </template>
                    </el-checkbox-group>
                    <el-select
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-select'"
                      v-model="scope.row[item3.key]"
                    >
                      <el-option
                        :key="option.value"
                        v-bind="option"
                        v-for="option in item3.component.options"
                      ></el-option>
                    </el-select>
                    <el-cascader
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-cascader'"
                      v-model="scope.row[item3.key]"
                    ></el-cascader>
                    <el-switch
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-switch'"
                      v-model="scope.row[item3.key]"
                    ></el-switch>
                    <el-slider
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-slider'"
                      v-model="scope.row[item3.key]"
                    ></el-slider>
                    <el-time-select
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-time-select'"
                      v-model="scope.row[item3.key]"
                    ></el-time-select>
                    <el-time-picker
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-time-picker'"
                      v-model="scope.row[item3.key]"
                    ></el-time-picker>
                    <el-date-picker
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-date-picker'"
                      v-model="scope.row[item3.key]"
                    ></el-date-picker>
                    <el-rate
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-rate'"
                      v-model="scope.row[item3.key]"
                    ></el-rate>
                    <el-color-picker
                      @change="$emit('cell-data-change', {rowIndex: scope.$index, key: item3.key, value: scope.row[item3.key], row: scope.row})"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                      v-else-if="item3.component && item3.component.name === 'el-color-picker'"
                      v-model="scope.row[item3.key]"
                    ></el-color-picker>
                    <render-custom-component
                      :component-name="item3.component.name"
                      :props="item3.component.props ? item3.component.props : null"
                      :scope="scope"
                      v-else-if="item3.component && item3.component.name"
                      v-model="scope.row[item3.key]"
                    ></render-custom-component>
                    <render-component
                      :render-function="item3.component.render"
                      :scope="scope"
                      v-else-if="item3.component && item3.component.render"
                    ></render-component>
                    <template v-else>{{item3.formatter ? item3.formatter(scope.row, scope.column, _get(scope.row,
                      item3.key), scope.$index) : _get(scope.row, item3.key)}}
                    </template>
                  </template>
                  <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
                </el-table-column>
              </template>
              <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
            </el-table-column>
          </template>
          <!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
        </el-table-column>
        <!-- <d2-column :columns="columns"></d2-column> -->
        <el-table-column
          :label="handleAttribute(rowHandle.columnHeader, '操作')"
          v-bind="rowHandle"
          v-if="rowHandle"
        >
          <template slot-scope="scope">
            <template
              :key="index"
              v-for="(item, index) in handleAttribute(rowHandle.custom, [])"
            >
              <el-button
                :disabled="handleRowHandleButtonDisabled(item.disabled, scope.$index, scope.row)"
                @click="$emit(item.emit, {index: scope.$index, row: scope.row})"
                v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item) : item"
                v-if="handleRowHandleButtonShow(item.show, scope.$index, scope.row)"
              >
                {{item.text}}
              </el-button>
            </template>
            <el-upload
              :data="rowHandle.upload.data ? Object.assign(scope.row, rowHandle.upload.data) : scope.row"
              :disabled="handleRowHandleButtonDisabled(rowHandle.upload.disabled, scope.$index, scope.row)"
              :on-error="handleUploadError(scope.$index, scope.row)"
              :on-progress="handleUploadProgress(scope.$index, scope.row)"
              :on-success="handleUploadSuccess(scope.$index, scope.row)"
              :show-file-list="false"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.upload) : rowHandle.upload"
              v-if="rowHandle.upload && handleRowHandleButtonShow(rowHandle.upload.show, scope.$index, scope.row)"
            >
              <el-button
                :disabled="handleRowHandleButtonDisabled(rowHandle.upload.disabled, scope.$index, scope.row)"
                :size="$d2CrudSize"
                type="primary"
              >{{scope.row.d2UploadProgress !== undefined ? `${scope.row.d2UploadProgress} %` :
                handleAttribute(rowHandle.upload.text, '上传')}}
              </el-button>
            </el-upload>
            <el-button
              :disabled="handleRowHandleButtonDisabled(rowHandle.edit.disabled, scope.$index, scope.row)"
              @click="handleEdit(scope.$index, scope.row)"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.edit) : rowHandle.edit"
              v-if="rowHandle.edit && handleRowHandleButtonShow(rowHandle.edit.show, scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.edit.text, '编辑')}}
            </el-button>
            <el-button
              :disabled="handleRowHandleButtonDisabled(rowHandle.remove.disabled, scope.$index, scope.row)"
              :type="handleAttribute(rowHandle.remove.type, 'danger')"
              @click="handleRemove(scope.$index, scope.row)"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.remove) : rowHandle.remove"
              v-if="rowHandle.remove && handleRowHandleButtonShow(rowHandle.remove.show, scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.remove.text, '删除')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="d2-crud-pagination"
      v-if="pagination"
    >
      <el-pagination
        @current-change="handlePaginationCurrentChange"
        @next-click="handlePaginationNextClick"
        @prev-click="handlePaginationPrevClick"
        @size-change="handlePaginationSizeChange"
        v-bind="pagination"
      ></el-pagination>
    </div>
    <el-dialog
      :before-close="handleDialogCancel"
      :title="formMode === 'edit' ? editTitle : addTitle"
      :visible.sync="isDialogShow"
      v-bind="formOptions"
      v-if="isDialogShow"
    >
      <el-form
        :model="formData"
        :rules="handleFormRulesMode()"
        ref="form"
        v-bind="formOptions"
      >
        <el-row v-bind="formOptions">
          <template
            :key="index"
            v-for="(value, key, index) in formData"
          >
            <el-col
              :offset="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.offset, 0) : 0"
              :span="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.span, 24) : 24"
              v-if="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.show, true) : true"
            >
              <el-form-item
                :label="handleFormTemplateMode(key).title"
                :prop="key"
              >
                <el-input
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-if="(!handleFormTemplateMode(key).component) ||((!handleFormTemplateMode(key).component.name) && (!handleFormTemplateMode(key).component.render)) || handleFormTemplateMode(key).component.name === 'el-input'"
                  v-model="formData[key]"
                ></el-input>
                <el-input-number
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-input-number'"
                  v-model="formData[key]"
                ></el-input-number>
                <el-radio-group
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-radio'"
                  v-model="formData[key]"
                >
                  <template v-if="handleFormTemplateMode(key).component.buttonMode">
                    <el-radio-button
                      :key="option.value"
                      :label="option.value"
                      v-for="option in handleFormTemplateMode(key).component.options"
                    >
                      {{option.label}}
                    </el-radio-button>
                  </template>
                  <template v-else>
                    <el-radio
                      :key="option.value"
                      :label="option.value"
                      v-for="option in handleFormTemplateMode(key).component.options"
                    >
                      {{option.label}}
                    </el-radio>
                  </template>
                </el-radio-group>
                <el-checkbox-group
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-checkbox'"
                  v-model="formData[key]"
                >
                  <template v-if="handleFormTemplateMode(key).component.buttonMode">
                    <el-checkbox-button
                      :key="option.value"
                      :label="option.value"
                      v-for="option in handleFormTemplateMode(key).component.options"
                    >
                      {{option.label}}
                    </el-checkbox-button>
                  </template>
                  <template v-else>
                    <el-checkbox
                      :key="option.value"
                      :label="option.value"
                      v-for="option in handleFormTemplateMode(key).component.options"
                    >
                      {{option.label}}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
                <el-select
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-select'"
                  v-model="formData[key]"
                >
                  <el-option
                    :key="option.value"
                    v-bind="option"
                    v-for="option in handleFormTemplateMode(key).component.options"
                  ></el-option>
                </el-select>
                <el-cascader
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-cascader'"
                  v-model="formData[key]"
                ></el-cascader>
                <el-switch
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-switch'"
                  v-model="formData[key]"
                ></el-switch>
                <el-slider
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-slider'"
                  v-model="formData[key]"
                ></el-slider>
                <el-time-select
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-time-select'"
                  v-model="formData[key]"
                ></el-time-select>
                <el-time-picker
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-time-picker'"
                  v-model="formData[key]"
                ></el-time-picker>
                <el-date-picker
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-date-picker'"
                  v-model="formData[key]"
                ></el-date-picker>
                <el-rate
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-rate'"
                  v-model="formData[key]"
                ></el-rate>
                <el-color-picker
                  @change="$emit('form-data-change', {key: key, value: value})"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-color-picker'"
                  v-model="formData[key]"
                ></el-color-picker>
                <render-custom-component
                  :component-name="handleFormTemplateMode(key).component.name"
                  :props="handleFormTemplateMode(key).component.props ? handleFormTemplateMode(key).component.props : null"
                  v-else-if="handleFormTemplateMode(key).component.name"
                  v-model="formData[key]"
                ></render-custom-component>
                <render-component
                  :render-function="handleFormTemplateMode(key).component.render"
                  :scope="formData[key]"
                  v-else-if="handleFormTemplateMode(key).component.render"
                ></render-component>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button
          :icon="formOptions ? handleAttribute(formOptions.saveButtonIcon, null) : null"
          :loading="formOptions ? handleAttribute(formOptions.saveLoading, false) : false"
          :size="formOptions ? handleAttribute(formOptions.saveButtonSize, null) : null"
          :type="formOptions ? handleAttribute(formOptions.saveButtonType, null) : null"
          @click="handleDialogSave"
        >
          {{formOptions ? handleAttribute(formOptions.saveButtonText, '确定') : '确定'}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import base from './mixin/base'
  import handleRow from './mixin/handleRow'
  import data from './mixin/data'
  import edit from './mixin/edit'
  import add from './mixin/add'
  import upload from './mixin/upload'
  import remove from './mixin/remove'
  import dialog from './mixin/dialog'
  import pagination from './mixin/pagination'
  import exposeMethods from './mixin/exposeMethods.js'
  import utils from './mixin/utils'
  import renderComponent from './components/renderComponent.vue'
  import renderCustomComponent from './components/renderCustomComponent.vue'
  // import d2Column from './components/d2-column.vue'

  export default {
    name: 'd2-crud',
    mixins: [
      base,
      data,
      handleRow,
      edit,
      add,
      upload,
      remove,
      dialog,
      pagination,
      exposeMethods,
      utils
    ],
    components: {
      renderComponent,
      renderCustomComponent
      // d2Column
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .d2-crud {
    .d2-crud-header {
      border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
    }

    .d2-crud-body {
      padding: 15px 0;
      overflow: hidden;
    }

    .d2-crud-pagination {
      padding: 15px 0;
    }
  }
</style>
