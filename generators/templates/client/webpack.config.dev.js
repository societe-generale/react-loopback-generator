const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, '..', 'client');
const buildPath = path.join(clientPath, 'build');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
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
  devServer: { <% if (serverport) { %>
    proxy: {
      '/api*': {
        target: 'http://localhost:<%= serverport %>',
        secure: false
      }
    }, <% } %>
    contentBase: buildPath,
    hot: true
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
          presets: ['es2015', 'react']
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
    new LiveReloadPlugin({appendScriptTag: true}),
  ]
};
