import { service } from '@/api/_service'

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  actions: {
    /**
     *
     * @param {*} param0
     * @param {*} info
     */
    async info ({ state, dispatch }, info) {
      const res = await service.get('/user/profile')
      await dispatch('d2admin/user/set', res, { root: true })
    },
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    async set ({ state, dispatch }, info) {
      // store 赋值
      state.info = info
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      }, { root: true })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    async load ({ state, dispatch }) {
      // store 赋值
      state.info = await dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: {},
        user: true
      }, { root: true })
    }
  }
}
