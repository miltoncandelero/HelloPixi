const PACKAGE = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }] },
  output: { path: buildPath },
  devServer: { contentBase: 'build', port: 3000, hot: true },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: '', globOptions: { ignore: ['**/index.html'] } }] }),
    new HTMLWebpackPlugin(
      { template: 'assets/index.html', filename: 'index.html', templateParameters: { PACKAGE: PACKAGE, buildDate: new Date } })
  ]
}