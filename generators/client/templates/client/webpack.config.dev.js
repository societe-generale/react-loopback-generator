const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, '..', 'client');
const buildPath = path.join(clientPath, 'build');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8001',
    path.join(clientPath, 'source/main.jsx')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  output: {
    path: buildPath,
    filename: './bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: buildPath,
    hot: true,
    https: true,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [
          path.join(clientPath, 'source')
        ],
        query: {
          cacheDirectory: '/tmp',
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
    ],
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint'
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ]
};
