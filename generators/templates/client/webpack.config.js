const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, '..', 'client');
const buildPath = path.join(clientPath, 'build');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(clientPath, 'source/main.jsx')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  output: {
    path: buildPath,
    filename: './bundle.js'
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
          cacheDirectory: true,
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
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: true
      }
    })
  ]
};
