<template>
  <a-config-provider :locale="locale">
    <div id="app" ref="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  computed: {
    locale() {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

      return this.$i18n.getLocaleMessage('zh-CN').antLocale
    }
  }
}
</script>
<style lang="less">
@import "assets/less/public";
/* 隐藏设置按钮 */
.ant-pro-setting-drawer-handle {
  display: none !important;
}
</style>
