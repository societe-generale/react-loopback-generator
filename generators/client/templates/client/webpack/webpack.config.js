process.env.NODE_ENV = 'production';

const path = require('path');

const params = require('./params');
const jsRules = require('./rules.javascript')(params);
const mediaRules = require('./rules.media')(params);
const styleRules = require('./rules.styles')(params);
const wpPlugins = require('./plugins')(params);

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(params.clientPath, 'source/main.jsx'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  output: {
    path: params.buildPath,
    filename: './bundle.js',
  },
  module: {
    loaders: [
      ...jsRules,
      ...styleRules,
      ...mediaRules,
    ],
  },
  plugins: [...wpPlugins],
};
