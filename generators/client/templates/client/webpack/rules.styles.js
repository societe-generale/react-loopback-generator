const ExtractTextPlugin = require('extract-text-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = params => [
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
  },
];
