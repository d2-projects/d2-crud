<template>
  <div>
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :height="height"
      :max-height="maxHeight"
      :row-class-name="tableRowClassName"
    >
      <!-- <d2-column :columns="columns"></d2-column> -->
      <el-table-column
        v-for="(item, index) of columns"
        :prop="item.key ? item.key : ''"
        :label="item.title"
        :width="item.width ? item.width : ''"
        :fixed="item.fixed ? item.fixed : false"
        :key="index"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="(item2, index2) in item.children"
            :prop="item2.key ? item2.key : ''"
            :label="item2.title"
            :width="item2.width ? item2.width : ''"
            :fixed="item2.fixed ? item2.fixed : false"
            :key="index2"
          >
            <template v-if="item2.children">
              <el-table-column
                v-for="(item3, index3) in item2.children"
                :prop="item3.key ? item3.key : ''"
                :label="item3.title"
                :width="item3.width ? item3.width : ''"
                :fixed="item3.fixed ? item3.fixed : false"
                :key="index3"
              >
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import d2Column from './components/d2-column.vue';

export default {
  name: 'd2Curd',
  components: {
    // d2Column,
  },
  props: {
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true,
    },
    /**
     * @description 表格数据
     */
    data: {
      type: Array,
      required: true,
    },
    /**
     * @description 斑马纹
     */
    stripe: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 边框
     */
    border: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 表格高度
     */
    height: {
      type: String,
      default: 'auto',
    },
    maxHeight: {
      type: String,
      default: 'auto',
    },
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
      if (row.rowControl) {
        return row.rowControl.rowClassName;
      }
      return '';
    },
  },
};
</script>
