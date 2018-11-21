<template>
  <div
    class="d2-crud"
    v-loading="loading"
    :element-loading-text="loadingOptions ? handleAttribute(loadingOptions.text, null) : null"
    :element-loading-spinner="loadingOptions ? handleAttribute(loadingOptions.spinner, null) : null"
    :element-loading-background="loadingOptions ? handleAttribute(loadingOptions.background, null) : null"
  >
    <div class="d2-crud-title" v-if="title || addMode || $slots.headerButton">
      <span>{{title}}</span>
      <div class="fr">
        <el-button
          v-if="addMode"
          :icon="addButton ? handleAttribute(addButton.icon, 'el-icon-plus') : 'el-icon-plus'"
          v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, addButton) : addButton"
          @click="handleAdd"
        >
          {{addButton ? handleAttribute(addButton.text, '新增') : '新增'}}
        </el-button>
        <slot name="headerButton"></slot>
      </div>
    </div>
    <div class="d2-crud-body">
      <el-table
        ref="elTable"
        :data="pagination ? d2PaginationData : d2Data"
        v-bind="options"
        @current-change="handleCurrentChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @cell-click="handleCellClick"
        @cell-dblclick="handleCellDblclick"
        @row-click="handleRowClick"
        @row-contextmenu="handleRowContextmenu"
        @row-dblclick="handleRowDblclick"
        @header-click="handleHeaderClick"
        @header-contextmenu="handleHeaderContextmenu"
      >
        <el-table-column
          v-if="selectionRow || selectionRow === ''"
          type="selection"
          :label="handleAttribute(selectionRow.title, '')"
          v-bind="selectionRow"
        >
        </el-table-column>
        <el-table-column
          v-if="indexRow || indexRow === ''"
          type="index"
          :label="handleAttribute(indexRow.title, '')"
          v-bind="indexRow"
        >
        </el-table-column>
        <!-- 暂不使用d2-column递归组件，有bug -->
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
            <render-custom-component
              v-else-if="item.component && item.component.name"
              v-model="scope.row[item.key]"
              :component-name="item.component.name"
              :scope="scope">
            </render-custom-component>
            <render-component
              v-else-if="item.component && item.component.render"
              :render-function="item.component.render"
              :scope="scope"
            >
            </render-component>
            <template v-else>{{item.formatter ? item.formatter(scope.row, scope.column, _get(scope.row, item.key), scope.$index) : _get(scope.row, item.key)}}</template>
          </template>
          <template v-if="item.children">
            <el-table-column
              v-for="(item2, index2) in item.children"
              :key="index2"
              :label="handleAttribute(item2.title, '')"
              :prop="handleAttribute(item2.key, null)"
              v-bind="item2"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="item2.component && item2.component.name === 'el-input'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-input>
                <el-input-number
                  v-else-if="item2.component && item2.component.name === 'el-input-number'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-input-number>
                <el-radio-group
                  v-else-if="item2.component && item2.component.name === 'el-radio'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                  <template v-if="item2.component.buttonMode">
                    <el-radio-button
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-radio-button>
                  </template>
                  <template v-else>
                    <el-radio
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-radio>
                  </template>
                </el-radio-group>
                <el-checkbox-group
                  v-else-if="item2.component && item2.component.name === 'el-checkbox'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                  <template v-if="item2.component.buttonMode">
                    <el-checkbox-button
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-checkbox-button>
                  </template>
                  <template v-else>
                    <el-checkbox
                      v-for="option in item2.component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
                <el-select
                  v-else-if="item2.component && item2.component.name === 'el-select'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                  <el-option
                    v-for="option in item2.component.options"
                    :key="option.value"
                    v-bind="option"
                  >
                  </el-option>
                </el-select>
                <el-cascader
                  v-else-if="item2.component && item2.component.name === 'el-cascader'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-cascader>
                <el-switch
                  v-else-if="item2.component && item2.component.name === 'el-switch'"
                  v-model="scope.row[item2.key]"
                  v-bind="item2.component"
                >
                </el-switch>
                <el-slider
                  v-else-if="item2.component && item2.component.name === 'el-slider'"
                  v-model="scope.row[item2.key]"
                  v-bind="item2.component"
                >
                </el-slider>
                <el-time-select
                  v-else-if="item2.component && item2.component.name === 'el-time-select'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-time-select>
                <el-time-picker
                  v-else-if="item2.component && item2.component.name === 'el-time-picker'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-time-picker>
                <el-date-picker
                  v-else-if="item2.component && item2.component.name === 'el-date-picker'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-date-picker>
                <el-rate
                  v-else-if="item2.component && item2.component.name === 'el-rate'"
                  v-model="scope.row[item2.key]"
                  v-bind="item2.component"
                >
                </el-rate>
                <el-color-picker
                  v-else-if="item2.component && item2.component.name === 'el-color-picker'"
                  v-model="scope.row[item2.key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item2.component) : item2.component"
                >
                </el-color-picker>
                <render-custom-component
                  v-else-if="item2.component && item2.component.name"
                  v-model="scope.row[item2.key]"
                  :component-name="item2.component.name"
                  :scope="scope">
                </render-custom-component>
                <render-component
                  v-else-if="item2.component && item2.component.render"
                  :render-function="item2.component.render"
                  :scope="scope"
                >
                </render-component>
                <template v-else>{{item2.formatter ? item2.formatter(scope.row, scope.column, _get(scope.row, item2.key), scope.$index) : _get(scope.row, item2.key)}}</template>
              </template>
              <template v-if="item2.children">
                <el-table-column
                  v-for="(item3, index3) in item2.children"
                  :key="index3"
                  :label="handleAttribute(item3.title, '')"
                  :prop="handleAttribute(item3.key, null)"
                  v-bind="item3"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-if="item3.component && item3.component.name === 'el-input'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-input>
                    <el-input-number
                      v-else-if="item3.component && item3.component.name === 'el-input-number'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-input-number>
                    <el-radio-group
                      v-else-if="item3.component && item3.component.name === 'el-radio'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                      <template v-if="item3.component.buttonMode">
                        <el-radio-button
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                        >
                          {{option.label}}
                        </el-radio-button>
                      </template>
                      <template v-else>
                        <el-radio
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                        >
                          {{option.label}}
                        </el-radio>
                      </template>
                    </el-radio-group>
                    <el-checkbox-group
                      v-else-if="item3.component && item3.component.name === 'el-checkbox'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                      <template v-if="item3.component.buttonMode">
                        <el-checkbox-button
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                        >
                          {{option.label}}
                        </el-checkbox-button>
                      </template>
                      <template v-else>
                        <el-checkbox
                          v-for="option in item3.component.options"
                          :key="option.value"
                          :label="option.value"
                        >
                          {{option.label}}
                        </el-checkbox>
                      </template>
                    </el-checkbox-group>
                    <el-select
                      v-else-if="item3.component && item3.component.name === 'el-select'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                      <el-option
                        v-for="option in item3.component.options"
                        :key="option.value"
                        v-bind="option"
                      >
                      </el-option>
                    </el-select>
                    <el-cascader
                      v-else-if="item3.component && item3.component.name === 'el-cascader'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-cascader>
                    <el-switch
                      v-else-if="item3.component && item3.component.name === 'el-switch'"
                      v-model="scope.row[item3.key]"
                      v-bind="item3.component"
                    >
                    </el-switch>
                    <el-slider
                      v-else-if="item3.component && item3.component.name === 'el-slider'"
                      v-model="scope.row[item3.key]"
                      v-bind="item3.component"
                    >
                    </el-slider>
                    <el-time-select
                      v-else-if="item3.component && item3.component.name === 'el-time-select'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-time-select>
                    <el-time-picker
                      v-else-if="item3.component && item3.component.name === 'el-time-picker'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-time-picker>
                    <el-date-picker
                      v-else-if="item3.component && item3.component.name === 'el-date-picker'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-date-picker>
                    <el-rate
                      v-else-if="item3.component && item3.component.name === 'el-rate'"
                      v-model="scope.row[item3.key]"
                      v-bind="item3.component"
                    >
                    </el-rate>
                    <el-color-picker
                      v-else-if="item3.component && item3.component.name === 'el-color-picker'"
                      v-model="scope.row[item3.key]"
                      v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item3.component) : item3.component"
                    >
                    </el-color-picker>
                    <render-custom-component
                      v-else-if="item3.component && item3.component.name"
                      v-model="scope.row[item3.key]"
                      :component-name="item3.component.name"
                      :scope="scope">
                    </render-custom-component>
                    <render-component
                      v-else-if="item3.component && item3.component.render"
                      :render-function="item3.component.render"
                      :scope="scope"
                    >
                    </render-component>
                    <template v-else>{{item3.formatter ? item3.formatter(scope.row, scope.column, _get(scope.row, item3.key), scope.$index) : _get(scope.row, item3.key)}}</template>
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
          v-if="rowHandle"
          :label="handleAttribute(rowHandle.columnHeader, '操作')"
          v-bind="rowHandle"
        >
          <template slot-scope="scope">
            <el-button
              v-if="rowHandle.edit && handleRowHandleButtonShow(rowHandle.edit.show, scope.$index, scope.row)"
              :disabled="handleRowHandleButtonDisabled(rowHandle.edit.disabled, scope.$index, scope.row)"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.edit) : rowHandle.edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.edit.text, '编辑')}}
            </el-button>
            <el-button
              v-if="rowHandle.remove && handleRowHandleButtonShow(rowHandle.remove.show, scope.$index, scope.row)"
              :type="handleAttribute(rowHandle.remove.type, 'danger')"
              :disabled="handleRowHandleButtonDisabled(rowHandle.remove.disabled, scope.$index, scope.row)"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.remove) : rowHandle.remove"
              @click="handleRemove(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.remove.text, '删除')}}
            </el-button>
            <template
              v-for="(item, index) in handleAttribute(rowHandle.custom, [])"
              :key="index">
              <el-button
                v-if="handleRowHandleButtonShow(item.show, scope.$index, scope.row)"
                :disabled="handleRowHandleButtonDisabled(item.disabled, scope.$index, scope.row)"
                v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item) : item"
                @click="$emit(item.emit, {index: scope.$index, row: scope.row})"
              >
                {{item.text}}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="d2-crud-pagination" v-if="pagination">
      <el-pagination
        :total="d2DataLength"
        :currentPage.sync="currentPage"
        v-bind="pagination"
        @size-change="handlePaginationSizeChange"
        @current-change="handlePaginationCurrentChange"
        @prev-click="handlePaginationPrevClick"
        @next-click="handlePaginationNextClick"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="formMode === 'edit' ? '编辑' : '新增'"
      :visible.sync="showDialog"
      :before-close="handleDialogCancel"
      @open="handleDialogOpen"
      @opened="handleDialogOpened"
      @close="handleDialogClose"
      @closed="handleDialogClosed"
      v-bind="formOptions"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        v-bind="formOptions"
      >
        <el-row v-bind="formOptions">
          <template v-for="(value, key, index) in formData" :key="index">
            <el-col
              v-if="formTemplate[key].component ? handleAttribute(formTemplate[key].component.show, true) : true"
              :span="formTemplate[key].component ? handleAttribute(formTemplate[key].component.span, 24) : 24"
              :offset="formTemplate[key].component ? handleAttribute(formTemplate[key].component.offset, 0) : 0"
            >
              <el-form-item
                :label="formTemplate[key].title"
                :prop="key"
              >
                <el-input
                  v-if="(!formTemplate[key].component) ||((!formTemplate[key].component.name) && (!formTemplate[key].component.render)) || formTemplate[key].component.name === 'el-input'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-input>
                <el-input-number
                  v-else-if="formTemplate[key].component.name === 'el-input-number'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-input-number>
                <el-radio-group
                  v-else-if="formTemplate[key].component.name === 'el-radio'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                  <template v-if="formTemplate[key].component.buttonMode">
                    <el-radio-button
                      v-for="option in formTemplate[key].component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-radio-button>
                  </template>
                  <template v-else>
                    <el-radio
                      v-for="option in formTemplate[key].component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-radio>
                  </template>
                </el-radio-group>
                <el-checkbox-group
                  v-else-if="formTemplate[key].component.name === 'el-checkbox'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                  <template v-if="formTemplate[key].component.buttonMode">
                    <el-checkbox-button
                      v-for="option in formTemplate[key].component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-checkbox-button>
                  </template>
                  <template v-else>
                    <el-checkbox
                      v-for="option in formTemplate[key].component.options"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{option.label}}
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
                <el-select
                  v-else-if="formTemplate[key].component.name === 'el-select'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                  <el-option
                    v-for="option in formTemplate[key].component.options"
                    :key="option.value"
                    v-bind="option"
                  >
                  </el-option>
                </el-select>
                <el-cascader
                  v-else-if="formTemplate[key].component.name === 'el-cascader'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-cascader>
                <el-switch
                  v-else-if="formTemplate[key].component.name === 'el-switch'"
                  v-model="formData[key]"
                  v-bind="formTemplate[key].component"
                >
                </el-switch>
                <el-slider
                  v-else-if="formTemplate[key].component.name === 'el-slider'"
                  v-model="formData[key]"
                  v-bind="formTemplate[key].component"
                >
                </el-slider>
                <el-time-select
                  v-else-if="formTemplate[key].component.name === 'el-time-select'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-time-select>
                <el-time-picker
                  v-else-if="formTemplate[key].component.name === 'el-time-picker'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-time-picker>
                <el-date-picker
                  v-else-if="formTemplate[key].component.name === 'el-date-picker'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-date-picker>
                <el-rate
                  v-else-if="formTemplate[key].component.name === 'el-rate'"
                  v-model="formData[key]"
                  v-bind="formTemplate[key].component"
                >
                </el-rate>
                <el-color-picker
                  v-else-if="formTemplate[key].component.name === 'el-color-picker'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, formTemplate[key].component) : formTemplate[key].component"
                >
                </el-color-picker>
                <render-custom-component
                  v-else-if="formTemplate[key].component.name"
                  v-model="formData[key]"
                  :component-name="formTemplate[key].component.name">
                </render-custom-component>
                <render-component
                  v-else-if="formTemplate[key].component.render"
                  :render-function="formTemplate[key].component.render"
                  :scope="formData[key]"
                >
                </render-component>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button
          :size="formOptions ? handleAttribute(formOptions.saveButtonSize, null) : null"
          :type="formOptions ? handleAttribute(formOptions.saveButtonType, null) : null"
          :icon="formOptions ? handleAttribute(formOptions.saveButtonIcon, null) : null"
          :loading="formOptions ? handleAttribute(formOptions.saveLoading, false) : false"
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
import remove from './mixin/remove'
import dialog from './mixin/dialog'
import pagination from './mixin/pagination'
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
    remove,
    dialog,
    pagination,
    utils
  ],
  components: {
    renderComponent,
    renderCustomComponent
    // d2Column
  }
}
</script>

<style lang="scss" scoped>
.fr {
  float: right;
}
.d2-crud {
  .d2-crud-title {
    color: #535351;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    font-weight: bold;
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
