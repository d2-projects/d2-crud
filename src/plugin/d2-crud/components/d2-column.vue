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
      <d2-column v-if="item.children" :columns="item.children"></d2-column>
    </el-table-column>
  </div>
</template>

<script>
import utils from '../mixin/utils';

export default {
  name: 'd2-column',
  mixins: [
    utils,
  ],
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
