const path = require('path');
const {
  smart,
} = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const base = require('./webpack.base');

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      // 表示放优化的插件
      new TerserWebpackPlugin({
        parallel: true, // 开启多进程并行压缩
        cache: true, // 开启缓存 第一次bulid代码时用时Time: 3088ms, 第二次Time: 1178ms 第三次Time: 863ms
        extractComments: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      // new OptimizeCssAssetsWebpackPlugin({
      //   assetNameRegExp: /\.css/g, // 指定要压缩的模块规则
      //   // cssnano时postCss的css优化和分解插件，cssnano采用很好的css， 并通过许多优化, 以确保最终的生产环境尽可能的小
      //   cssProcessor: require('cssnano'),
      // }),
    ],
    // 某些chunk的子chunk已一种方式被确定，这些子chunk在加载更大的块时不必加载这些 chunk 子集 ???
    flagIncludedChunks: true, // prodction下默认开启
    // 给经常使用的ids更短的值
    occurrenceOrder: true, // prodction下默认开启
    // 确定每个模块下被使用的导出
    usedExports: true, // prodction下默认开启
    // 识别package.json or rules sideEffects标志
    sideEffects: true, // prodction下默认开启
    // 可以安全串联到单个模块中的模块图段 prodction下默认开启 将多个moulde封装进一个function中, 如果为false那么每一个moudle将会封装到一个function中
    concatenateModules: true,

    // 使用uglify-js压缩代码  ---> 这种方式需要文件一个个进行压缩 会导致过程耗时非常大（因为压缩JS代码需要先把代码解析成用Object抽象表示的AST语法树，再去应用各种规则分析和处理AST）
    // 可以使用webpack-parallel-uglify-plugin这个插 它会开启多个子进程，每个子进程还是通过uglify-js来压缩，但是 是并行处理多个子任务
    minimize: true, // 在没有用压缩插件(TerserWebpackPlugin)之前这个选项并并没有压缩js代码

    // 设置optimization.runtimeChunk=true ,将每一个入口添加一个只包含runtime的额外代码块.然而设置值为single,只会为所有生成的代码块创建一个共享的runtime文件.runtime:连接模块化应用程序的所有代码. 多个入口时
    // runtimeChunk: true,
    // runtimeChunk: 'single',
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all', // 默认作用与异步，值为all/inital/async
      minSize: 3000, // 默认值是30kb,代码块的最小尺寸
      minChunks: 1, // 被多少模块共享，在分割之前模块的被引用次数
      maxAsyncRequests: 5, // 按需加载最大并行请求数量
      maxInitialRequests: 3, // 一个入口的最大并行请求数量
      name: true, // 打包后的名称，默认是chunk的名字通过分隔符（默认是~）分割开， 如 vendor~
      automaticNameDelimiter: '~', // 默认webpack将会使用入口和代码的名称生成命名，比如: 'vendors!main.js'
      cacheGroups: { // 设置缓存租用来抽取不同规则的chunk，下面以生成common为例
        // 如果下面如 name重新定义了，那么上面的值将会覆盖
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: /node_modules/,
          priority: -10,
        },
        commons: {
          chunks: 'initial',
          name: 'commons',
          minSize: 0,
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
      // // 项目公共组件  拆分
      // common: {
      //   chunks: 'initial',
      //   test: /[\\/]node_modules[\\/](lodash|moment|bignumber.js|jquery|antd|uuidjs|socket.io-client|numeral)[\\/]/,
      //   minSize: 0,
      // },
      // // 单独打包react插件
      // 'react-vendor': {
      //   chunks: 'initial', // 'initial', 'async', 'all',
      //   test: /[\\/]node_modules[\\/](prop-types|babel-polyfill)|react|react-[\\/]/,
      //   // name: 'react-vendor',
      //   priority: -9,
      //   minSize: 0,
      //   enforce: true,
      // },
      // // 第三方组件
      // vendor: {
      //   test: /node_modules/,
      //   chunks: 'initial',
      //   minSize: 0,
      //   // name: 'vendor',
      //   priority: -10,
      //   enforce: true,
      // },
    },
  },
  plugins: [
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist/static-files', 'react.manifest.json'),
    }),
    // new ParallelUglifyPlugin({}),
  ],
});
