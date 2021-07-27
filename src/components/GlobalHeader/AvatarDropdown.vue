<template>
  <a-dropdown v-if="userInfo && userInfo.realname" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="userInfo.avatar"
                class="antd-pro-global-header-index-avatar" />
      <span>{{ userInfo.realname }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AvatarDropdown',
  data() {
    return {
      menu: true
    }
  },
  computed: {
    ...mapGetters('user', [
      'userInfo'
    ])
  },
  methods: {
    handleToCenter() {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings() {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout(e) {
      Modal.confirm({
        title: '信息',
        content: '您确定要注销妈？',
        onOk: () => {
          this.SetLoginout().then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel() {
        }
      })
    },
    ...mapActions('user', ['SetLoginout'])
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.ant-pro-account-avatar {
  display: flex;
  align-items: center;
  .antd-pro-global-header-index-avatar {
    margin-right: 5px;
  }
}

</style>
