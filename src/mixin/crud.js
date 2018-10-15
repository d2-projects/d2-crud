function getDate() {
  const date = new Date()
  date.setHours(date.getHours() + 8)
  return date.toJSON().replace(/\..+/, '').replace('T', ' ')
}

export default {
  data: {
    showList: true,
    title: null,
    current: {},
    entityClass: {},
    user: {},
  },
  async beforeMount() {
    this.getUser()
  },
  methods: {
    async findAll(entityName) {
      return await spring.extend(entityName).findAll()
    },
    query() {
      this.reload()
    },
    add() {
      this.showList = false
      this.title = '新增'
      this.current = new this.entityClass()
      if(this.id){
        this.current.customerId = this.id
      }
    },
    async update(event) {
      const id = getSelectedRow()
      if (id == null) {
        return
      }
      this.showList = false
      this.title = '修改'

      await this.getInfo(id)
    },
    getUser() {
      const user = alasql('SELECT * from user')
      if(user && user[0]){
        this.user = user[0]
      } else{
        $.getJSON(baseURL + 'sys/user/info?_' + $.now(), (r) => {
          this.user = r.user
          alasql('SELECT * INTO user FROM ?', [[r.user]]);
        })
      }

    },
    addDate: function (current = this.current) {
      current.updateDate = getDate()
      current.updateBy = this.user.username
      if (!current.id) {
        current.createDate = getDate()
        current.createBy = this.user.username
      }

    },
    saveOrUpdate(event) {
      this.addDate()

      this.current.save().then(this.success).catch(this.fail)
    },
    del(event) {
      const ids = getSelectedRows()
      if (ids == null) {
        return
      }
      if (ids.length == 1) {
        confirm('确定要删除选中的记录？', () => {
          this.entityClass.remove(ids[0]).then(this.success).catch(this.fail)
        })
      } else {
        confirm('确定要删除选中的记录？', () => {
          $.ajax({
            type: 'POST',
            url: baseURL + this.modulePath + 'delete',
            contentType: 'application/json',
            data: JSON.stringify(ids),
            success: (r) => {
              if (r.code == 0) {
                this.success(r)
              } else {
                this.fail(r)
              }
            }
          })
        })
      }
    },
    success(done= () => {},json) {
      alert('操作成功', (index) => {
        this.reload()
        done()
      })
    },
    fail(err) {
      console.log(err)
      alert(err)
    },
    async getInfo(id) {
      const one = await this.entityClass.findOne(id)
      this.current = one
    },
    reload(event) {
      this.showList = true
      const jqGrid = $('#jqGrid')
      if(jqGrid){
        const page = jqGrid.jqGrid('getGridParam', 'page')
        jqGrid.jqGrid('setGridParam', {
          page: 0
        }).trigger('reloadGrid')
      }
      if(this.getDataList){
        this.getDataList()
      }
    }
  }
}
