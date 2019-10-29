const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中

module.exports = {
  // context:process.cwd(),
  // context 是 webpack 编译时的基础目录，入口起点（entry）会相对于此目录查找。process.cwd()即webpack运行所在的目录（等同package.json所在目录）。
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // publicPath 并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片
    // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    publicPath: '/assets',
  },
  mode: 'development',
  optimization: {
    removeAvailableModules: true, // 默认情况下在production模式下启用。
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'], //引入模块时可以不使用扩展
    // alias: { // 创建别名 让模块引入变得简单
    //   Utilities: path.resolve(__dirname, 'src/utilities/'), // import Utility from 'Utilities/utility';
    // }
    // mainFields: ['browser', 'module', 'main'] // 默认值设置 当target 属性值没有指定或者设置为webworker,web时 详见笔记
    // mainFiles: ['index', 'main'], // ？？？？？ 解析目录时要使用的文件名 ---> 在目录中没有package.json时，指明使用该目录中哪个文件，默认是index.js
  },
  module: {
    noParse: /jquery|lodash/, // 不让webpack解析这些正则匹配的文件，原因是这些文件没有import，require，define的调用，可以提高构建性能
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // 用 babel-loader 转换 JavaScript 文件
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        // use: ['babel-loader?cacheDirectory'],
        use: ['babel-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      // },
      {
        text: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0, // 默认值0 ??? 记得说过
            }
          },
          {
            loader: 'postcss-loader', // PostCSS 的主要功能只有两个：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'less-loaber'
        ]

      },
      {
        test:/\.(ttf|svg|eot|woff|woff2|otf)/,
        use:{
            loader:'url-loader'
        }
    },
    {
      test: /\.(htm|html)$/,
      loader: 'html-withimg-loader', // ，html中直接使用img标签src加载图片图片会被打包而且路径也处理妥当。npm -> 额外提供html的include子页面功能。
    }
    ]
  },
  plugins: [],
  devServer: {},
}