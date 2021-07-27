export const ModalMixin = {
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      disableSubmit: false, // 禁用提交
      confirmLoading: false, // loaidng提示
      rules: {},
      submit: {
        url: '', // 最后提交的url
        method: '' // 最后提交的method
      }
    }
  },
  created() {
    if (this.disableMixinCreated) {
      this.confirmLoading = true
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.visible = false
      if (this.$refs.form) {
        this.$refs.form.clearValidate()
      }
    },
    handleCancel() {
      this.close()
    },
    add() {
      this.model = {}
      this.visible = true
      if (this.url) {
        this.submit.url = this.url.add
        this.submit.method = 'post'
      }
    },
    edit(record) {
      this.model = JSON.parse(JSON.stringify(record))
      this.visible = true
      if (this.url) {
        this.submit.url = this.url.edit
        this.submit.method = 'put'
      }
    }
  }
}