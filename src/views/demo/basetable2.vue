<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="船舶名称">
              <a-input v-model="queryParam.shipName" placeholder="请输入船舶名称" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="mmsi">
              <a-input v-model="queryParam.mmsi" placeholder="请输入mmsi" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span class="table-operator">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      <a-button type="primary" icon="download">导出</a-button>
      <a-button type="primary" icon="import">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button> 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <!-- 选中条 -->
    <div class="ant-alert ant-alert-info">已选择&nbsp;<a>{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
      <a @click="onClearSelected">清空</a>
    </div>
    <!-- table区域 -->
    <a-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
    </a-table>
    <!-- 弹框 -->
    <ModalForm ref="modalForm" @ok="refreshTable"></ModalForm>
  </a-card>
</template>

<script>
import { TableSearchMixin } from '@/mixins/TableSearchMixin'
import ModalForm from './modules/model-aform'

export default {
  name: 'Analysis',
  mixins: [TableSearchMixin],
  components: {
    ModalForm
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '人员编号',
          align: 'center',
          dataIndex: 'no'
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '联系方式',
          align: 'center',
          dataIndex: 'phone'
        },
        {
          title: '人员类型',
          align: 'center',
          dataIndex: 'dutyType'
        },
        {
          title: '职务',
          align: 'center',
          dataIndex: 'post'
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'sex_dictText'
        },
        {
          title: '系统用户',
          align: 'center',
          dataIndex: 'sysUserName_dictText'
        },
        {
          title: '机构编码',
          align: 'center',
          dataIndex: 'orgCode'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/port/port/dutyUser/list',// table数据
        delete: '/port/port/dutyUser/delete',// 删除一条数据
        deleteBatch: '/port/port/dutyUser/deleteBatch'// 批量删除的url
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
