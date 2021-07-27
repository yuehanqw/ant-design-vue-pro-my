<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="姓名">
                    <a-input v-model="queryParam.name" placeholder="请输入姓名" />
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="船上职务">
                    <a-input v-model="queryParam.shipPost" placeholder="请输入船上职务" />
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
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      <a-button type="primary" icon="download">导出</a-button>
      <a-button type="primary" icon="download">导出模板</a-button>
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
    <div class="ant-alert ant-alert-info">已选择&nbsp;<a>{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
      <a @click="onClearSelected">清空</a>
    </div>
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
    <ModalForm ref="modalForm" @ok="refreshTable"></ModalForm>
  </a-card>
</template>

<script>
import {TableSearchMixin} from "@/mixins/TableSearchMixin"
import ModalForm from './modules/model-form'
export default {
    name:'Basetable',
    mixins:[TableSearchMixin],
    components:{
        ModalForm
    },
    data(){
        return{
            columns: [
                {
                    title: '序号',
                    dataIndex: '',
                    key: 'rowIndex',
                    width: 60,
                    align: "center",
                    customRender: function(t, r, index) {
                    return parseInt(index) + 1;
                    }
                },
                {
                    title: '姓名',
                    align: "center",
                    dataIndex: 'name'
                },
                {
                    title: '船上职务',
                    align: "center",
                    dataIndex: 'shipPost'
                },
                {
                    title: '适任证号码',
                    align: "center",
                    dataIndex: 'certificateNum'
                },
                {
                    title: '适任证等级',
                    align: "center",
                    dataIndex: 'certificateGrade'
                },
                {
                    title: '适任证职务',
                    align: "center",
                    dataIndex: 'certificatePost'
                },
                {
                    title: '任职类型',
                    align: "center",
                    dataIndex: 'postType'
                },
                {
                    title: '上船时间',
                    align: "center",
                    dataIndex: 'embarkationTime'
                },
                {
                    title: '上船地点',
                    align: "center",
                    dataIndex: 'embarkationPlace'
                },
                {
                    title: '所在船舶',
                    align: "center",
                    dataIndex: 'shipId_dictText'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: "center",
                    scopedSlots: { customRender: 'action' },
                }
            ],
            url: {
                list: "/port/port/shipStaffing/list",
                delete: "/port/port/shipStaffing/delete",
                deleteBatch: "/port/port/shipStaffing/deleteBatch"
            }
        }
    }
}
</script>

<style>

</style>