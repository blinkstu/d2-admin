<template>
  <div>
    <a-card title="Proxy Settings">
      <a-skeleton v-if="initLoading" />
      <a-form-model
        v-if="!initLoading"
        :model="form"
        v-bind="{
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }"
      >
        <a-form-model-item label="API key">
          <a-input v-model="form.apiKey" placeholder="API key" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button :loading="this.loading" type="primary" @click="submit">
            Save
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { service } from '@/api/_service'
export default {
  data () {
    return {
      initLoading: true,
      loading: false,
      field: 'proxy',
      form: {
        apiKey: ''
      }
    }
  },
  mounted () {
    service.get('/user/user_settings', { params: { field: this.field } }).then(res => {
      this.form = res
    }).finally(() => { this.initLoading = false })
  },
  methods: {
    submit () {
      this.loading = true
      service
        .post('/user/user_settings', {
          field: this.field,
          value: this.form
        })
        .then((res) => {
          this.$message.success(res.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
