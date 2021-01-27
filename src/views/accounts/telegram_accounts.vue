<template>
  <d2-container>
    <template slot="header">
      <a-space>
        <a-button @click="clickRefresh">Refresh</a-button>
        <a-button>Add Telegram Account</a-button>
        <a-button>Register One</a-button>
      </a-space>
    </template>
    <a-table
      bordered
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template slot="title">
        <a-tag color="pink">Total Count: {{ pagination.total }}</a-tag>
      </template>
    </a-table>
  </d2-container>
</template>
<script>
import { service } from '@/api/_service'
const columns = [
  {
    title: '#',
    width: '50px',
    dataIndex: 'id'
  },
  {
    title: 'Name',
    sorter: true,
    width: '20%',
    customRender: (text, record) => {
      if (record.last_name == null) {
        return record.first_name
      }
      return record.first_name + ' ' + record.last_name
    }
  },
  {
    title: 'Type',
    dataIndex: 'account_type',
    width: '20%'
  },
  {
    title: 'Id',
    dataIndex: 'telegram_id'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone'
  }
]

export default {
  data () {
    return {
      data: [],
      pagination: { pageSize: 10 },
      loading: false,
      columns
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    clickRefresh () {
      this.fetch()
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      this.loading = true
      service
        .get('/accounts', {
          params: {
            results: this.pagination.pageSize,
            ...params
          }
        })
        .then(data => {
          console.log(data)
          const pagination = { ...this.pagination }
          pagination.total = data.count
          this.data = data.results
          this.pagination = pagination
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
