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
        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" prop="shipName" label="船名">
          <a-select placeholder="请输入船名" v-model="model.shipName">
            <a-select-option value="锋祥8">锋祥8</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :labelCol="labelCol" :wrapperCol="wrapperCol" prop="dangerDetails" label="险情描述">
          <a-textarea :rows="3" placeholder="请输入险情描述" v-model="model.dangerDetails" />
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
        add: '/port/shipDangerReport/add',
        edit: '/port/shipDangerReport/edit'
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.confirmLoading = true
          httpAction(this.submit.url, this.model, this.submit.method).then((res) => {
            console.log('res',res);
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