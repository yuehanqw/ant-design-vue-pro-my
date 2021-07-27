<template>
  <a-dropdown placement="topCenter" class="toolbar">
    <a-menu slot="overlay">
      <a-menu-item key="1" @click="switchCheckStrictly(false)">父子关联</a-menu-item>
      <a-menu-item key="2" @click="switchCheckStrictly(true)">取消关联</a-menu-item>
      <a-menu-item v-if="checkable" key="3" @click="checkALL(true)">全部勾选</a-menu-item>
      <a-menu-item v-if="checkable" key="4" @click="checkALL(false)">取消全选</a-menu-item>
      <a-menu-item key="5" @click="expandAll(true)">展开所有</a-menu-item>
      <a-menu-item key="6" @click="expandAll(false)">合并所有</a-menu-item>
    </a-menu>
    <a-button>
      树操作
      <a-icon type="up"/>
    </a-button>
  </a-dropdown>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MyTreeBtn',
  props: {
    tree: {
      default: ''
    }
  },
  computed: {
    checkable() {
      let bool = false
      if (this.tree && this.tree.checkable) {
        bool = true
      }
      return bool
    }
  },
  methods: {
    // 父子关联
    switchCheckStrictly(bool) {
      this.tree.checkStrictly = bool
    },
    // 全部勾选
    checkALL(bool) {
      if (bool) {
        this.tree.checkedKeys = this.tree.allTreeKeys
      } else {
        this.tree.checkedKeys = []
      }
    },
    // 折叠全部
    expandAll(bool) {
      if (bool) {
        this.tree.expandedKeys = this.tree.allTreeKeys
      } else {
        this.tree.expandedKeys = []
      }
    }
  }
}
</script>

<style scoped>

</style>
