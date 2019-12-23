const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
console.log(process.env.NODE_ENV);
const hostUrl ='http://39.108.252.242:3000';
module.exports = {
    publicPath: './',//publicPath取代了baseUrl
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这  原来的 Compiler 换成了 runtimeCompiler
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: config => {
      config.resolve.alias.set('@',path.join(__dirname, "src"));
      config.resolve.symlinks(true);
    },
    configureWebpack: config => {
      if(process.env.NODE_ENV === 'production'){
        return{
          plugins : [new CompressionPlugin({
            test : /\.js$|\.html$|\.css/,
            threshold : 10240,
            deleteOriginalAssets : false
          })]
        }
      }
      Object.assign(config, {
        // 开发生产共同配置
          resolve: {
              extensions: ['.js', '.vue', '.json','.css','.scss'],
              alias: {
                  '@': path.resolve(__dirname, './src'),
              } // 别名配置
          }
      })
    },
    css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        css : {
   
        },
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.scss` 这个文件
        // 旧 sass-loader
        // data: `@import "./src/common.scss";`
        // 新 sass-loader
        // prependData: `@import "./src/common.scss";`
          prependData: `@import "./src/assets/css/sass/common.scss";`,
          
        },
        // modules: true
      }
    },
    // 配置 webpack-dev-server 行为。
    devServer: {
      open: false,
      host: '0.0.0.0',
      port: 8081,
      // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
      proxy: {
          '/api':{
            target :hostUrl,
            changeOrigin : true,
            pathRewrite : {
                '^/api': ''
            }
          }
      }, // string | Object
    //   before: app => {}
    }
  }

