process.env.NODE_ENV = 'development';

const path = require('path');

const params = require('./params');
const jsRules = require('./rules.javascript')(params);
const mediaRules = require('./rules.media')(params);
const styleRules = require('./rules.styles')(params);
const wpPlugins = require('./plugins')(params);

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8001',
    path.join(params.clientPath, 'source/main.jsx'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    path: params.buildPath,
    filename: './bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: params.buildPath,
    hot: true,
    https: true,
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      ...jsRules,
      ...styleRules,
      ...mediaRules,
    ],
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
      },
    ],
  },
  plugins: [...wpPlugins],
};
