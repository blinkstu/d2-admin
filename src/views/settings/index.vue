<template>
  <d2-container better-scroll>
    <a-row :gutter="30">
      <a-col :span="12">
        <proxy-setting />
      </a-col>
    </a-row>
  </d2-container>
</template>

<script>
import proxySetting from './components/proxy-setting'
export default {
  components: {
    'proxy-setting': proxySetting
  }
}
</script>
