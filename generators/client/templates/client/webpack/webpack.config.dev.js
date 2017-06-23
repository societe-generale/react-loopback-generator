process.env.NODE_ENV = 'development';

const path = require('path');

const params = require('./params');
const jsRules = require('./rules.javascript')(params);
const mediaRules = require('./rules.media')(params);
const styleRules = require('./rules.styles')(params);
const wpPlugins = require('./plugins')(params);

module.exports = () => ({
  // Generate source maps
  devtool: 'cheap-module-source-map',
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // webpack-dev-server/client is injected be dev-server

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // ES6 polyfills
    'babel-polyfill',

    // App entry point
    path.join(params.clientPath, 'source/index.dev.jsx'),
  ],
  output: {
    path: params.buildPath,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    // match the output path
    contentBase: params.buildPath,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // enable HMR on the server
    hot: true,
    // Enable SSL
    https: true,
    // Enable gzip compression of generated files.
    compress: true,
    // Inject webpack-dev-server/client
    inline: true,
    // Server listen port
    port: 8080,
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
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
