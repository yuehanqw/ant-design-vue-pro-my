import { getAction, deleteAction } from '@/api/api'

export const TableSearchMixin = {
  data() {
    return {
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* table选中keys*/
      selectedRowKeys: [],
      /* table选中records*/
      selectionRows: [],
      /* table加载状态 */
      loading: false,
      /*分页参数*/
      pagination: {
        current: 1,
        pageSize: 2,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      expandedRowKeys:[]
    }
  },
  created() {
    if (!this.disableMixinCreated) {
      this.loadData()
    }
  },
  methods: {
    loadData(page) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      this.loading = true
      const queryParam = { ...this.queryParam }
      queryParam.pageNo = page !== undefined ? page : this.pagination.current
      queryParam.pageSize = this.pagination.pageSize
      getAction(this.url.list, queryParam).then((res) => {
        this.loading = false
        const { result } = res
        console.log(result);
        this.dataSource = result.records || result
        if (result.total) {
          this.pagination.total = result.total
        }
      })
    },
    // 搜索
    searchQuery() {
      this.loadData(1)
    },
    // 重置搜索条件
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    // 分页、排序、筛选变化时触发
    handleTableChange(pagination) {
      this.pagination = pagination
      this.loadData()
    },
    // 勾选table行数据
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    // 清除table勾选
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    // 删除行数据
    batchDel() {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function() {
            that.loading = true
            deleteAction(that.url.deleteBatch, { ids: ids }).then((res) => {
              if (res.success) {
                //重新计算分页问题
                that.reCalculatePage(that.selectedRowKeys.length)
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.loading = false
            })
          }
        })
      }
    },
    reCalculatePage(count) {
      //总数量-count
      let total = this.pagination.total - count
      //获取删除后的分页数
      let currentIndex = Math.ceil(total / this.pagination.pageSize)
      //删除后的分页数<所在当前页
      if (currentIndex < this.pagination.current) {
        this.pagination.current = currentIndex
      }
    },
    // 删除一条数据
    handleDelete(id) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      deleteAction(that.url.delete, { id: id }).then((res) => {
        if (res.success) {
          //重新计算分页问题
          that.reCalculatePage(1)
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    // 编辑
    handleEdit(record, disableSubmit) {
      if (this.$refs.modalForm) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = disableSubmit ? '查看' : '编辑'
        this.$refs.modalForm.disableSubmit = disableSubmit || false
      }
    },
    // 新增
    handleAdd() {
      if (this.$refs.modalForm) {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
      }
    },
    // 刷新表数据
    refreshTable() {
      // 新增/修改 成功时，重载列表
      this.loadData()
      //清空列表选中
      this.onClearSelected()
    }
  }
}