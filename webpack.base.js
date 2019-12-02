const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // context:process.cwd(),
  // context 是 webpack 编译时的基础目录，入口起点（entry）会相对于此目录查找。process.cwd()即webpack运行所在的目录（等同package.json所在目录）。
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // chunkFilename: '[name]-[contenthash].js', // 由webpack打包模块后生成的 eg: src下的js -- node_moudoules下的js打包在一起生成的chunk
    // publicPath 并不会对生成文件的路径造成影响，主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片
    // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    publicPath: '',
  },
  optimization: {
    removeAvailableModules: true, // 默认情况下在production模式下启用。parent chunk中解决了的chunk会被删除
    removeEmptyChunks: true, // 删除空的chunks
    mergeDuplicateChunks: true, // 合并空的chunks
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'], // 引入模块时可以不使用扩展
    // alias: { // 创建别名 让模块引入变得简单
    //   Utilities: path.resolve(__dirname, 'src/utilities/'), // import Utility from 'Utilities/utility';
    // }
    // mainFields: ['browser', 'module', 'main'] // 默认值设置 当target 属性值没有指定或者设置为webworker,web时 详见笔记
    // mainFiles: ['index', 'main'], // ？？？？？ 解析目录时要使用的文件名 ---> 在目录中没有package.json时，指明使用该目录中哪个文件，默认是index.js
  },
  externals: { // 引用第三方库但不想让webpack打包且不影响以cmd amd或者全局(webpack.ProvidePlugin)的方式使用
    jquery: 'jQuery',
    lodash: '_', // key是lodash，是一个包的名字，值是_,是全局的变量名
  },
  module: {
    noParse: /jquery/, // 不让webpack解析这些正则匹配的文件，原因是这些文件没有import，require，define的调用，可以提高构建性能
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      // use: ['babel-loader?cacheDirectory'],
      use: 'babel-loader',
    },
    // {
    //   test: /\.scss$/,
    //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    // },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 0, // 默认值0 ??? 记得说过
          },
        },
        {
          loader: 'postcss-loader', // PostCSS 的主要功能只有两个：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果
          options: {
            plugins: [
              require('autoprefixer'), // eslint-disable-line
            ],
          },
        },
        'less-loaber',
      ],
    },
    {
      test: /\.(ttf|svg|eot|woff|woff2|otf)/,
      use: {
        loader: 'url-loader',
      },
    },
    {
      test: /\.(htm|html)$/,
      loader: 'html-withimg-loader', // ，html中直接使用img标签src加载图片图片会被打包而且路径也处理妥当。npm -> 额外提供html的include子页面功能。
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*.dell.js', '!**/*.manifest.json'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      hash: true, // 为了避免缓存，可以在产出的资源后面添加hash值
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // name是代码码chunk的名字
    }),
    new webpack.ProvidePlugin({ // 配置后无需在import和require引入
      _: 'lodash',
      $: 'jquery',
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     // {
    //     //   module: 'react',
    //     //   entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.10.2/umd/react.production.min.js',
    //     //   global: 'React',
    //     // },
    //     // {
    //     //   module: 'react-dom',
    //     //   entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.10.2/umd/react-dom.production.min.js',
    //     //   global: 'ReactDOM',
    //     // },
    //   // {
    //   //   module: 'react-router-dom',
    //   //   entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.1.2/react-router-dom.min.js',
    //   //   global: 'react-router-dom',
    //   // }
    //   ],
    // }),
  ],

};
