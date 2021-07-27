<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download">导出</a-button>
      <a-button type="primary" icon="import">导入</a-button>
    </div>
    <div class="ant-alert ant-alert-info">已选择&nbsp;<a>{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
      <a @click="onClearSelected">清空</a>
    </div>
    <a-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :pagination="false"
      :loading="loading"
      :expandedRowKeys="expandedRowKeys"
      @expandedRowsChange="handleExpandedRowsChange"
      @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a>编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.name)">
            <a>删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a>添加下级</a>
        </span>
    </a-table>
  </a-card>
</template>

<script>
import { TableSearchMixin } from '@/mixins/TableSearchMixin'

export default {
  name: 'Treetable',
  mixins: [TableSearchMixin],
  data() {
    return {
      columns: [
        {
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',
          align: 'left'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/api/treeList'
      }
    }
  },
  methods: {
    handleExpandedRowsChange(expandedRows) {
      this.expandedRowKeys = expandedRows
    }
  }
}
</script>
<style scoped>

</style>