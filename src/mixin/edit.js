import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  data () {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0
    }
  },
  methods: {
    /**
     * @description 编辑行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     */
    handleEdit (index, row) {
      this.formMode = 'edit'
      this.showDialog = true
      this.editIndex = index
      this.formData = this.formTemplate ? _clonedeep(this.formTemplate) : {}
      _forEach(this.formData, (value, key) => {
        this.formData[key] = row[key] ? row[key] : ''
      })
    }
  }
}
