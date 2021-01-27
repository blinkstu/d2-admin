import { Message } from 'element-ui'
import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import { get } from 'lodash'
import util from '@/libs/util'
import store from '@/store'
import router from '@/router'

/**
 * @description 记录和显示错误
 * @param {Error} error 错误对象
 */
function handleError (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

/**
 * @description 创建请求实例
 * @return {}
 */
function createService () {
  const service = axios.create({
    baseURL: 'http://localhost:8000/api'
  })

  service.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      config.headers = {
        'Accept-Language': `Token ${token}`
      }
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    response => {
      // http 状态码 200 情况
      // 根据 前后端约定的 response.data.code 判断接口是否请求成功
      // 例如 接口返回数据为
      // {
      //   code: 0,
      //   msg: 'success',
      //   data: {
      //     list: [],
      //     count: 0
      //   }
      // }
      // 此时
      // response.data.code :
      // 0
      // response.data.msg :
      // 'success'
      // response.data.data : (在调用接口)
      // {
      //   list: [],
      //   count: 0
      // }
      // 默认约定 code 为 0 时代表成功
      // 你也可以不使用这种方法，改为在下面的 http 错误拦截器里做处理

      // 没有 code 视为非项目接口不作处理
      if (response.data.code === undefined) {
        return response.data
      }
    },
    error => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; router.push({ name: 'login' }); break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
      handleError(error)
      // throw error
    }
  )
  return service
}

export const service = createService()
export const serviceForMock = createService()

// 网络请求数据模拟工具
export const mock = new Adapter(serviceForMock)
