<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="船名">
                    <a-input v-model="queryParam.shipName" placeholder="请输船名" />
                    </a-form-item>
                </a-col>
                <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="险情描述">
                    <a-input v-model="queryParam.dangerDetails" placeholder="请输入险情描述" />
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
import ModalForm from './modules/model-newform'
export default {
    name:'Newtable',
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
                align: 'center',
                customRender: function(t, r, index) {
                    return parseInt(index) + 1
                }
                },
                {
                title: '船名',
                align: 'center',
                dataIndex: 'shipName'
                },
                {
                title: '内河船/海船',
                align: 'center',
                dataIndex: 'shipRiverOrSea_dictText'
                },
                {
                title: '船舶总吨',
                align: 'center',
                dataIndex: 'shipGrossTon'
                },
                {
                title: '船舶功率',
                align: 'center',
                dataIndex: 'shipEnginePower'
                },
                {
                title: '载重吨',
                align: 'center',
                dataIndex: 'shipDwt'
                },
                {
                title: '船舶类型',
                align: 'center',
                dataIndex: 'shipType_dictText'
                },
                {
                title: '险情发生时间',
                align: 'center',
                dataIndex: 'dangerTime'
                },
                {
                title: '险情发生地点',
                align: 'center',
                dataIndex: 'dangerAddress'
                },
                {
                title: '管辖地海事管理机构',
                align: 'center',
                dataIndex: 'dangerManageOrg'
                },
                {
                title: '险情描述',
                align: 'center',
                dataIndex: 'dangerDetails'
                },
                {
                title: '报告时间',
                align: 'center',
                dataIndex: 'createTime'
                },
                {
                title: '操作',
                dataIndex: 'action',
                align: 'center',
                scopedSlots: { customRender: 'action' }
                }
            ],
            url: {
                list: "/port/shipDangerReport/list",
                delete: "/port/shipDangerReport/delete",
                deleteBatch: "/port/shipDangerReport/deleteBatch"
            }
        }
    }
}
</script>

<style>

</style>
