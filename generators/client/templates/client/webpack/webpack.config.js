process.env.NODE_ENV = 'production';

const path = require('path');

const params = require('./params');
const jsRules = require('./rules.javascript')(params);
const mediaRules = require('./rules.media')(params);
const styleRules = require('./rules.styles')(params);
const wpPlugins = require('./plugins')(params);

module.exports = () => ({
  // Don't attempt to continue if there are any errors.
  bail: true,
  entry: [
    // ES6 polyfills
    'babel-polyfill',
    // App entry point
    path.join(params.clientPath, 'source/index.jsx'),
  ],
  output: {
    path: params.buildPath,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      ...jsRules,
      ...styleRules,
      ...mediaRules,
    ],
  },
  plugins: [...wpPlugins],
});
