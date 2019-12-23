const path = require('path')
const webpack = require('webpack')
const {library} = require('./package.json')
// const assetsSubDirectory = process.env.NODE_ENV === 'production'
//   ? build.assetsSubDirectory : dev.assetsSubDirectory
let { version_lib } = require('./package.json');
version_lib = version_lib.replace(/\./g,'_');
module.exports = {
  entry: library,
  output: {
    path: path.resolve(__dirname, './libs/package/js'),
    filename: `[name].${version_lib}.dll.js`,
    library: '[name]_library'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization:{
    minimizer:[
      new UglifyPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true, // console
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './libs/package/json', '[name].manifest.json'),
      name: '[name]_library',
      context: process.cwd()
    })
  ]
}
