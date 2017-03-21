const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const clientPath = path.join(__dirname, '..', 'client');
const buildPath = path.join(clientPath, 'build');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8001',
    path.join(clientPath, 'source/main.jsx'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    path: buildPath,
    filename: './bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: buildPath,
    hot: true,
    https: true,
  },
  externals: {
   'react/addons': true,
   'react/lib/ExecutionEnvironment': true,
   'react/lib/ReactContext': true
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(clientPath, 'source'),
        ],
        query: {
          cacheDirectory: '/tmp',
          presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
          plugins: ['transform-runtime']
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader?configFileName=./client/tsconfig.json'],
        include: [
          path.join(clientPath, 'source'),
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
    ],
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'tslint-loader',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
