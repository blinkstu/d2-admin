import { uniqueId } from 'lodash'

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 功能
import demoPlayground from './modules/demo-playground'

// 设定
import Settings from './modules/settings'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// 菜单 侧边栏
export const menuAside = supplementPath([
  {
    path: '/index',
    title: 'Dashboard',
    icon: 'home'
  },
  {
    path: '/accounts',
    title: 'Accounts',
    icon: 'user',
    children: [
      { path: '/accounts/index', title: 'Telegram Accounts', icon: 'telegram' }
    ]
  },
  demoComponents,
  demoPlugins,
  demoPlayground
])

// 菜单 顶栏
export const menuHeader = supplementPath([
  {
    path: '/settings',
    title: 'Settings',
    icon: 'cog'
  }
  // Settings,
  // demoPlayground,
  // demoComponents,
  // demoPlugins
])
