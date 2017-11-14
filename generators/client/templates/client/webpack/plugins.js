const webpack = require('webpack');
//
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = (params) => {
  const plugins = [];

  // Clean build dir
  plugins.push(new CleanWebpackPlugin(['build'], {
    root: params.clientPath,
  }));

  // scope hoisting
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  // -- Dev plugins
  if (isDev) {
    // enable HMR globally
    plugins.push(new webpack.HotModuleReplacementPlugin());
    // prints more readable module names in the browser console on HMR updates
    plugins.push(new webpack.NamedModulesPlugin());
    //
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  // Move all css "requires" into a separate single file
  const extractTextPluginOptions = {
    filename: '[name].css',
    allChunks: true,
    // Only use ExtractTextPlugin for production build
    // Note: ExtractTextPlugin break css hot reloading
    disable: !isProd,
  };
  plugins.push(new ExtractTextPlugin(extractTextPluginOptions));

  // Define global app variables
  const definePluginOptions = {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  };
  plugins.push(new webpack.DefinePlugin(definePluginOptions));

  // Generate index.html from template
  const htmlWebpackPluginOptions = {
    template: params.plugins.htmlWebpackPlugin.template,
    title: params.plugins.htmlWebpackPlugin.title,
    inject: 'body',
    hash: true,
  };
  if (isProd) {
    htmlWebpackPluginOptions.minify = {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    };
  }
  plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));

  // Generate favicon
  const faviconsWebpackPluginOptions = {
    logo: params.plugins.faviconsWebpackPlugin.logo,
    persistentCache: !isProd,
    icons: params.plugins.faviconsWebpackPlugin.icons,
  };
  plugins.push(new FaviconsWebpackPlugin(faviconsWebpackPluginOptions));

  // Prod only plugins
  if (isProd) {
    // Uglify js code
    const uglifyJsPluginOptions = {
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    };
    plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyJsPluginOptions));
  }

  return plugins;
};
