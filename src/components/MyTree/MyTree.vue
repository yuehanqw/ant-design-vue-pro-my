<template>
  <div class="wrapper flex flex-y">
    <a-input-search
      v-if="placeholder.length>0"
      v-model="searchValue"
      @change="onChange"
      :placeholder="placeholder"/>
    <div class=" flex-1 relative">
      <div class="tree-wrapper">
        <a-tree
          ref="tree"
          :key="replaceFields.key"
          :tree-data="newTreeData"
          :replaceFields="replaceFields"
          :expandedKeys="expandedKeys"
          :checkedKeys="checkedKeys"
          :checkStrictly="checkStrictly"
          :auto-expand-parent="myAutoExpandParent"
          :checkable="checkable"
          :blockNode="blockNode"
          :disabled="disabled"
          :multiple="multiple"
          :selectable="selectable"
          :selectedKeys="selectedKeys"
          :showIcon="showIcon"
          :showLine="showLine"
          :defaultExpandParent="defaultExpandParent"
          :loadData="onLoadData"
          @check="onCheck"
          @expand="onExpand"
          @select="onSelect"
        >
          <template slot="titleSpec" slot-scope="node">
            <slot name="spec" :node="node" :replaceFields="replaceFields"></slot>
          </template>
          <template slot="title" slot-scope="node">
                                <span
                                  v-if="node[replaceFields.title] && searchValue && node[replaceFields.title].indexOf(searchValue) > -1">
                                  {{
                                    node[replaceFields.title].substr(0, node[replaceFields.title].indexOf(searchValue))
                                  }}
                                  <span style="color: #f50">{{ searchValue }}</span>
                                  {{
                                    node[replaceFields.title].substr(node[replaceFields.title].indexOf(searchValue) + searchValue.length)
                                  }}
                                </span>
            <span v-else>{{ node[replaceFields.title] }}
                                  <b class="num" v-if="replaceFields.num && node[replaceFields.num]">
                                    ({{ node[replaceFields.num] }})
                                  </b>
                                </span>
          </template>
        </a-tree>
        <a-spin class="spin" v-show="loading">
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin/>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: 'MyTree',
  props: {
    slotSpec: {
      type: Boolean,
      default: false
    },
    // 树数据
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    // 替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段
    replaceFields: {
      type: Object,
      default() {
        return {children: 'children', title: 'title', key: 'key'}
      }
    },
    // 节点前添加 Checkbox 复选框
    checkable: {
      type: Boolean,
      default: false
    },
    // 是否节点占据一行
    blockNode: {
      type: Boolean,
      default: false
    },
    // 是否自动展开父节点
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    // 默认选中复选框的树节点
    defaultCheckedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认展开指定的树节点
    defaultExpandedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认是否展开全部
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 默认是否选择全部
    defaultSelectedAll: {
      type: Boolean,
      default: false
    },
    // 默认是否勾选全部
    defaultCheckedAll: {
      type: Boolean,
      default: false
    },
    // 默认选中的树节点
    defaultSelectedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认展开父节点
    defaultExpandParent: {
      type: Boolean,
      default: true
    },
    // 父子节点是否关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 将树禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 支持点选多个节点（节点本身）
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可选中
    selectable: {
      type: Boolean,
      default: true
    },
    // 是否展示 TreeNode title 前的图标
    showIcon: {
      type: Boolean,
      default: false
    },
    // 是否展示连接线
    showLine: {
      type: Boolean,
      default: false
    },
    //
    // 搜索提示
    placeholder: {
      type: String,
      default: ''
    },
    // 是否初始化
    visible: {
      type: Boolean,
      default: false
    },
    // 启用自己的提交
    submitSpec: {
      type: Boolean,
      default: false
    },
    // loading
    loading: {
      type: Boolean,
      default: false
    },
    // 异步加载数据
    lazy: {
      type: Boolean,
      default: false
    },
    // 一次只展开一层
    expandOne: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 树 增加了新属性
      newTreeData: [],
      // 展开的key集合
      expandedKeys: [],
      // 勾选的key集合
      checkedKeys: [],
      halfCheckedKeys: [],
      // 选中的书节点
      selectedKeys: [],
      // 树的所有key集合
      allTreeKeys: [],
      // 转成一级数组的树数据
      allTreeArr: [],
      // 自己的展开
      myAutoExpandParent: this.autoExpandParent,
      // 搜索值
      searchValue: ''
    }
  },
  methods: {
    // 搜索
    onChange() {
      const me = this
      let arr = []
      this.allTreeArr.forEach(item => {
        if (item[this.replaceFields.title].indexOf(this.searchValue) !== -1) {
          arr.push(item[this.replaceFields.key])
        }
      })
      this.myAutoExpandParent = this.autoExpandParent
      this.expandedKeys = arr
    },
    // 折叠操作
    onExpand(expandedKeys) {
      // 只展开一个
      if (this.expandOne) {
        this.expandedKeys = expandedKeys.length ? expandedKeys.slice(expandedKeys.length - 1) : []
      } else {
        this.expandedKeys = expandedKeys
      }
      this.myAutoExpandParent = false
    },
    // 勾选操作
    onCheck(checkedKeys, node) {
      if (this.checkStrictly) {
        this.checkedKeys = checkedKeys.checked
      } else {
        this.checkedKeys = checkedKeys
      }
      this.halfCheckedKeys = node.halfCheckedKeys
      this.$emit('check', checkedKeys, node)
    },
    // 选中
    onSelect(selectedKeys, node) {
      this.selectedKeys = selectedKeys
      this.$emit('select', {data: selectedKeys, node})
      if (this.checkable) {
        this.selectedKeys = []
      }
    },
    // 异步加载数据
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef[this.replaceFields.children] && treeNode.dataRef[this.replaceFields.children].length > 0) {
          resolve();
          return;
        }
        this.$emit('loadData', {treeNode, callback: resolve})
        // this.$parent.loadData({treeNode,callback:resolve})
      })
    },
    //初始化数据
    initData(tree) {
      const me = this
      const data = JSON.parse(JSON.stringify(tree))
      let allTreeKeys = []
      let allTreeArr = []

      function DLR(obj) {
        if (obj) {
          if (me.slotSpec) {
            obj.scopedSlots = {title: 'titleSpec'}
          } else {
            obj.scopedSlots = {title: 'title'}
          }

          allTreeKeys.push(obj[me.replaceFields.key])
          allTreeArr.push(obj)
          if (obj[me.replaceFields.children] && obj[me.replaceFields.children].length > 0) {
            for (let j in obj[me.replaceFields.children]) {
              DLR(obj[me.replaceFields.children][j])
            }
          } else {
            if (!me.lazy) {
              obj.isLeaf = true
            }
          }
        }
      }

      for (let i in data) {
        DLR(data[i])
      }
      me.allTreeKeys = allTreeKeys
      me.allTreeArr = allTreeArr
      me.newTreeData = data
      console.log(data)
      me.$nextTick(() => {
        me.$emit('load')
      })
    },
    /*  对外暴露的方法 */
    // 获取勾选的key
    getCheckedKeys(bool) {
      if (bool) {
        return this.checkedKeys
      } else {
        let checkedKeys = []
        // 只给叶子节点
        for (let i in this.checkedKeys) {
          for (let j in this.allTreeArr) {
            if (this.allTreeArr[j][this.replaceFields.key] === this.checkedKeys[i]) {
              const child = this.allTreeArr[j][this.replaceFields.children]
              if (!child || child.length === 0) {
                checkedKeys.push(this.checkedKeys[i])
              }
            }
          }
        }
        return checkedKeys
      }
    },
    setCheckedKeys(data) {
      this.checkedKeys = data
    },
    // 获取勾选的node
    getCheckedNodes(bool) {
      const res = []
      const checkedKeys = this.getCheckedKeys(bool)
      for (let i in this.checkedKeys) {
        for (let j in this.allTreeArr) {
          if (this.allTreeArr[j][this.replaceFields.key] === checkedKeys[i]) {
            res.push(this.allTreeArr[j])
          }
        }
      }
      return res
    },
    // 过滤key数组去设置defaultCheckedKeys
    filterKey(keyArr) {
      let arr = []
      const allTreeArr = this.allTreeArr
      for (let i in keyArr) {
        for (let j in allTreeArr) {
          if (allTreeArr[j][this.replaceFields.key] === keyArr[i]) {
            if (allTreeArr[j][this.replaceFields.children] && allTreeArr[j][this.replaceFields.children].length > 0) {
              let flag = true
              for (let k in allTreeArr[j][this.replaceFields.children]) {
                if (keyArr.indexOf(allTreeArr[j][this.replaceFields.children][k][this.replaceFields.key]) === -1) {
                  flag = false
                  break
                }
              }
              if (flag) {
                arr.push(keyArr[i])
              }
            } else {
              arr.push(keyArr[i])
            }
            break
          }
        }
      }
      return arr
    },
    // 根据key获取数据
    getNodeByKey(key) {
      let arr = this.allTreeArr.filter(item => item[this.replaceFields.key] === key)
      if (arr.length === 1) {
        arr = arr[0]
      } else {
        arr = null
      }
      return arr
    },
    // 清除选中的item
    clearSelectedKeys() {
      this.selectedKeys = []
    }
  },
  watch: {
    // 监听树的数据
    treeData: {
      handler() {
        this.initData(this.treeData)
      },
      immediate: true,
      deep: true
    },
    // 监听默认勾选的数据
    defaultCheckedKeys: {
      handler() {
        if (this.defaultCheckedKeys.length >= 0 && !this.defaultCheckedAll) {
          this.checkedKeys = JSON.parse(JSON.stringify(this.defaultCheckedKeys))
        }
        // 设置展开
        if (this.defaultExpandedKeys.length === 0 && !this.defaultExpandAll) {
          if (!this.defaultCheckedAll) {
            if (this.defaultCheckedKeys.length === 0) {
              this.expandedKeys = [this.allTreeKeys[0]]
            } else {
              this.expandedKeys = JSON.parse(JSON.stringify(this.defaultCheckedKeys))
            }
          } else {
            this.expandedKeys = this.allTreeKeys
          }
        }
      },
      immediate: true,
      deep: true
    },
    // 监听默认展开的数据
    defaultExpandedKeys: {
      handler() {
        if (this.defaultExpandedKeys.length > 0 && !this.defaultExpandAll) {
          this.expandedKeys = JSON.parse(JSON.stringify(this.defaultExpandedKeys))
        }
      },
      immediate: true,
      deep: true
    },
    // 监听默认选中的数据
    defaultSelectedKeys: {
      handler() {
        if (this.defaultSelectedKeys.length > 0) {
          this.selectedKeys = JSON.parse(JSON.stringify(this.defaultSelectedKeys))
        }
      },
      immediate: true,
      deep: true
    },
    // 监听是否展开全部
    defaultExpandAll: {
      handler() {
        if (this.defaultExpandAll) {
          let arr = []
          for (let i in this.allTreeArr) {
            if (this.allTreeArr[i][this.replaceFields.children] && this.allTreeArr[i][this.replaceFields.children].length > 0) {
              arr.push(this.allTreeArr[i][this.replaceFields.key])
            }
          }
          this.expandedKeys = arr
          setTimeout(() => {
            this.expandedKeys = arr
          }, 20)
        }
      },
      immediate: true,
      deep: true
    },
    // 监听是否选择全部
    defaultSelectedAll: {
      handler() {
        if (this.defaultSelectedAll) {
          this.selectedKeys = JSON.parse(JSON.stringify(this.allTreeKeys))
        }
      },
      immediate: true,
      deep: true
    },
    // 监听是否勾选全部
    defaultCheckedAll: {
      handler() {
        if (this.defaultCheckedAll) {
          this.checkedKeys = JSON.parse(JSON.stringify(this.allTreeKeys))
        }
      },
      immediate: true,
      deep: true
    },
    visible() {
      if (!this.visible) {
        this.expandedKeys = []
        this.checkedKeys = []
        this.selectedKeys = []
        this.myAutoExpandParent = this.autoExpandParent
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
}

.tree-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
}

.spin {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
