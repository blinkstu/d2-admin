module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: (name) => `${name}/style/less`
      },
      'vant'
    ]
    // ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }]
  ],
  // common + es6 共存
  sourceType: 'unambiguous'
}
