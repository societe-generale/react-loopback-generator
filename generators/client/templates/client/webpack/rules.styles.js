const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pcCssnext = require('postcss-cssnext');
const pcImport = require('postcss-import');
const pcStylelint = require('stylelint');

const isProd = process.env.NODE_ENV === 'production';

const cssLoaderOptions = (withCssModules) => {
  const conf = {
    importLoaders: 1,
    sourceMap: !isProd,
    minimize: isProd,
  };
  if (withCssModules) {
    conf.modules = true;
    conf.localIdentName = isProd ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]';
  }
  return conf;
};

const loaders = (params, withCssModules) =>
  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: cssLoaderOptions(withCssModules),
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            pcStylelint,
            pcImport,
            pcCssnext({
              // Autoprefixer
              browsers: params.postCss.browsers,
            }),
          ],
        },
      },
    ],
  });

module.exports = params => [
  {
    // *.css from source => CSS Modules
    test: /\.css$/,
    exclude: [/node_modules/, /\.global\.css$/],
    use: loaders(params, true),
  },
  {
    // *.global.css from source => global (normal) css
    test: /\.global\.css$/,
    use: loaders(params, false),
  },
  {
    // *.css from node_modules => global (normal) css
    test: /\.css$/,
    include: [/node_modules/],
    use: loaders(params, false),
  },
];
