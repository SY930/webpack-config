const path = require('path');
const DellPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react-router-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '_dll_[name]',
  },
  plugins: [
    new DellPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      path: path.join(__dirname, 'dist', '[name].manifest.json'),
    }),
  ],
};
