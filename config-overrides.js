
const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addLessLoader
} = require('customize-cra')


module.exports = override(
  addDecoratorsLegacy(),

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',

     style: true,
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { 
    '@primary-color': '#e34234',
    '@primary-text-color': 'white',
    '@font-family': '"proxima_novaregular", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !default',
  } 
 }),
)