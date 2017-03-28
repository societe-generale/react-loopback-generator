const webpack = require('webpack');
//
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (params) => {
  const plugins = [];

  // Clean build dir
  plugins.push(new CleanWebpackPlugin(['build'], {
    root: params.clientPath,
  }));

  // Move all css "requires"" into a separate single file
  const extractTextPluginOptions = '[name].css';
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
    //
    plugins.push(new webpack.optimize.DedupePlugin());
    // Uglify js code
    const uglifyJsPluginOptions = {
      minimize: true,
      compress: {
        warnings: true,
      },
    };
    plugins.push(new webpack.optimize.UglifyJsPlugin(uglifyJsPluginOptions));
  }

  return plugins;
};
