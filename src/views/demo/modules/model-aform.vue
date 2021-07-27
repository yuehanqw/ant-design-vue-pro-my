<template>
  <a-modal
    :title="title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <!--只改a-form-model部分 -->
      <a-form-model ref="form" :model="model" :rules="rules">
        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name" label="姓名">
          <a-input placeholder="请输入姓名" v-model="model.name" />
        </a-form-model-item>
        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" prop="sex" label="性别">
          <a-select v-model="model.sex" placeholder="请选择性别">
            <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="0">女</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/api'
import { ModalMixin } from '@/mixins/ModalMixin'

export default {
  name: 'ModalForm',
  mixins: [ModalMixin],
  data() {
    return {
      url: {
        add: '/port/port/dutyUser/add',
        edit: '/port/port/dutyUser/edit'
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.confirmLoading = true
          httpAction(this.submit.url, this.model, this.submit.method).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok')
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.confirmLoading = false
            this.close()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>