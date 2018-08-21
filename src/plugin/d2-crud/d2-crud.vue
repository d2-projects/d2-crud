<template>
  <div class="d2-crud">
    <div class="d2-crud-title">
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
      </div>
    </div>
    <div class="d2-crud-body">
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
        :show-summary="showSummary"
        :summary-method="summaryMethod"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <el-table-column
          v-if="selectionRow"
          type="selection"
          v-bind="selectionRow"
        >
        </el-table-column>
        <el-table-column
          v-if="indexRow"
          type="index"
          v-bind="indexRow"
        >
        </el-table-column>
        <d2-column :columns="columns"></d2-column>
        <el-table-column
          v-if="rowHandle"
          v-bind="rowHandle"
        >
          <template slot-scope="scope">
            <el-button
              v-if="rowHandle.edit"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.edit) : rowHandle.edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.edit.text, '编辑')}}
            </el-button>
            <el-button
              v-if="rowHandle.remove"
              :type="handleAttribute(rowHandle.remove.type, 'danger')"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, rowHandle.remove) : rowHandle.remove"
              @click="handleRemove(scope.$index, scope.row)"
            >
              {{handleAttribute(rowHandle.remove.text, '删除')}}
            </el-button>
            <el-button
              v-for="(item, index) in handleAttribute(rowHandle.custom, [])"
              :key="index"
              v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, item) : item"
              @click="$emit(item.emit, {index: scope.$index, row: scope.row})"
            >
              {{item.text}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="formMode === 'edit' ? '编辑' : '新增'"
      :visible.sync="showDialog"
      :before-close="handleDialogCancel"
      v-bind="formOption"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        v-bind="formOption"
      >
        <el-row v-bind="formOption">
          <el-col
            v-for="(value, key, index) in formData"
            :key="index"
            :span="formTemplate[key].component ? handleAttribute(formTemplate[key].component.span, 24) : 24"
            :offset="formTemplate[key].component ? handleAttribute(formTemplate[key].component.offset, 0) : 0"
          >
            <el-form-item
              :label="formTemplate[key].title"
              :prop="key"
            >
              <el-input
                v-if="(!formTemplate[key].component) || formTemplate[key].component.name === 'el-input'"
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
              <render-component
                v-else-if="formTemplate[key].component.render"
                :render-function="formTemplate[key].component.render"
              >
              </render-component>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleDialogSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import base from './mixin/base';
import handleRow from './mixin/handleRow';
import data from './mixin/data';
import edit from './mixin/edit';
import add from './mixin/add';
import remove from './mixin/remove';
import dialog from './mixin/dialog';
import utils from './mixin/utils';
import renderComponent from './components/renderComponent.vue';
import d2Column from './components/d2-column.vue';

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
    utils,
  ],
  components: {
    renderComponent,
    d2Column,
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
  },
};
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
}
</style>
